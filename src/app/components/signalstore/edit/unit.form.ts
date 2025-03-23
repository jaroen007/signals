import { FormControl, FormGroup, Validators } from '@angular/forms';

export const unitForm = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    code: new FormControl<string| undefined>(undefined, Validators.required),
    name: new FormControl<string | undefined>(undefined, Validators.required),
});
