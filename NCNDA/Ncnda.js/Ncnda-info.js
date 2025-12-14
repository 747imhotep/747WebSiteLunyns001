/* ============================================
   LUNYNS Ltd. NCNDA
   Update Supplier Info Section
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
    // Get input fields
    const companyInput = document.getElementById("companyName");
    const firstNameInput = document.getElementById("companyFirstName");
    const lastNameInput = document.getElementById("companyLastName");

    // Get supplier info output paragraph
    const supplierInfo = document.getElementById("supplierInfo");

    // Function to update supplier info dynamically
    function updateSupplier() {
        const company = companyInput.value.trim();
        const first = firstNameInput.value.trim();
        const last = lastNameInput.value.trim();

        if (!company && !first && !last) {
            supplierInfo.textContent = ""; // Clear if all fields empty
            return;
        }

        const fullName = (first + " " + last).trim();

        // Build the formatted supplier text
        supplierInfo.innerHTML = `<b>${company}</b>${fullName ? ", represented by " + fullName + ", the director," : ","}`;
    }

    // Add event listeners for live updates
    companyInput.addEventListener("input", updateSupplier);
    firstNameInput.addEventListener("input", updateSupplier);
    lastNameInput.addEventListener("input", updateSupplier);

    // Initialize on page load
    updateSupplier();
});
