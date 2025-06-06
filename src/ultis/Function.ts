<script lang = "ts">
import { ref } from 'vue'

function onTaxCodeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    // Remove any non-numeric characters
    input.value = input.value.replace(/\D/g, '');
    // Limit the input to 13 characters
    if (input.value.length > 13) {
        input.value = input.value.slice(0, 13);
    }
}
function onEmailDomainInput(event: Event) {
    let input = event.target as HTMLInputElement;
    let value = '@' + input.value.replace(/^@+/, '')
    // Remove invalid characters
    value = value.replace(/(\.[^.]*)$/, m => m.slice(0, 3)) 
    input.value = value
    form.value.emailDomain = value// Remove invalid characters
    // Ensure the input starts with '@' and contains no spaces
     // Allow letters, numbers, '@', '.', and '-'
}