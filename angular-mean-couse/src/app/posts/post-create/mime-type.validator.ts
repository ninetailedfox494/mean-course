import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";

export const mimeType = (
    control: AbstractControl
): Observable<ValidationErrors | null> => {
    if (typeof control.value === 'string') {
        // Already a string path from backend — assume valid
        return of(null);
    }

    const file = control.value as File;
    const fileReader = new FileReader();

    return new Observable((observer) => {
        fileReader.addEventListener('loadend', () => {
            const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
            let header = '';
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }

            let isValid = false;
            switch (header) {
                case '89504e47': // PNG
                case '47494638': // GIF
                case 'ffd8ffe0': // JPEG
                case 'ffd8ffe1':
                case 'ffd8ffe2':
                    isValid = true;
                    break;
                default:
                    isValid = false;
                    break;
            }

            if (isValid) {
                observer.next(null); // ✅ Valid
            } else {
                observer.next({ invalidMimeType: true }); // ❌ Invalid
            }
            observer.complete();
        });

        fileReader.readAsArrayBuffer(file);
    });
};
