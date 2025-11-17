        const { jsPDF } = window.jspdf;

        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('ddForm');
            const submitBtn = document.getElementById('submitBtn');
            const resetBtn = document.getElementById('resetBtn');
            const successMessage = document.getElementById('successMessage');
            const loadingOverlay = document.getElementById('loadingOverlay');

            // Show/hide conditional sections
            const roleRadios = document.querySelectorAll('input[name="transactionRole"]');
            const otherRoleWrapper = document.getElementById('otherRoleWrapper');
            
            roleRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    otherRoleWrapper.style.display = this.value === 'Other' ? 'block' : 'none';
                });
            });

            const authorizedRadios = document.querySelectorAll('input[name="authorizedToRepresent"]');
            const relationshipDetails = document.getElementById('relationshipDetails');
            
            authorizedRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.value === 'Yes') {
                        relationshipDetails.classList.add('show');
                        document.getElementById('relationshipNature').required = true;
                        document.getElementById('mandateValidity').required = true;
                    } else {
                        relationshipDetails.classList.remove('show');
                        document.getElementById('relationshipNature').required = false;
                        document.getElementById('mandateValidity').required = false;
                    }
                });
            });

            // Simple validation
            function validateField(field) {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    field.classList.add('error');
                    const errorEl = document.getElementById(field.id + 'Error');
                    if (errorEl) errorEl.classList.add('show');
                    return false;
                }
                field.classList.remove('error');
                const errorEl = document.getElementById(field.id + 'Error');
                if (errorEl) errorEl.classList.remove('show');
                return true;
            }

/* ============================================
   ADD YOUR CODE BELOW
   ============================================ */

            function loadImageAsBase64(url) {
            return new Promise((resolve, reject) => {
               const img = new Image();
               img.crossOrigin = 'anonymous'; // Optional: needed only if loading from another domain
               img.onload = function () {
                  const canvas = document.createElement('canvas');
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0);
                  const base64 = canvas.toDataURL('image/png');
                  resolve(base64);
               };
               img.onerror = function () {
                  reject(new Error('Failed to load image at ' + url));
               };
               img.src = url;
            });
 }
          
            // Generate PDF using jsPDF
            async function generatePDF(formData) {
               const imageUrl = '../../IMAGES/mainIMAGES/imgBANNER/Background-Letter001.png'; // ✅ Path to your letterhead + footer image
               const getValue = (name) => formData.get(name) || 'Not provided';

                // Setp1: 🔽 Load image as base64
                const base64Image = await loadImageAsBase64(imageUrl); // ✅ fixed camelCase

                // Step2: 🔽 Create PDF content
                const doc = new jsPDF({
                     orientation: 'portrait',
                     unit: 'mm',
                     format: 'a4'
                  });
                
                let y = 20;
                const lineHeight = 7;
                const pageHeight = doc.internal.pageSize.height;
                
                function addText(text, fontSize = 12, isBold = false) {
                    if (y > pageHeight - 20) {
                        doc.addPage();
                        doc.addImage(base64Image, 'PNG', 0, 0, 210, 297); // Re-add background
                        y = 20;
                    }
                    doc.setFontSize(fontSize);
                    doc.setFont(undefined, isBold ? 'bold' : 'normal');
                    const lines = doc.splitTextToSize(text, 180);
                    doc.text(lines, 15, y);
                    y += (lines.length * lineHeight);
                }

                // Step3: 🔽 Add the full background image (letterhead + footer)
                doc.addImage(base64Image, 'PNG', 0, 0, 210, 297);


               // Step4: 🔽 Add content on top
                
               // Header
                // doc.setFillColor(26, 77, 143);
                // doc.rect(0, 0, 210, 40, 'F');
                // doc.setTextColor(255, 255, 255);
                // doc.setFontSize(24);
                // doc.setFont(undefined, 'bold');
                // doc.text('LUNYNS Ltd.', 15, 15);
                doc.setFontSize(16);
                doc.setFont(undefined, 'normal');
                doc.text('Due Diligence Questionnaire', 15, 35);
                doc.setFontSize(10);
                doc.text('For Petroleum Transactions', 15, 42);
                
                // 🔽 Draw horizontal line under subtitle
                doc.setLineWidth(0.2); // optional — default is 1
                doc.line(15, 45, 195, 45); // from (x=15, y=45) to (x=195, y=45)
                
                doc.setTextColor(0, 0, 0);
                y = 50;

                const now = new Date().toLocaleString('en-GB');
                addText(`Submitted on: ${now}`, 10);
                y += 5;
// addText(`Company Name: ${getValue('companyName')}`);
addText('1. COMPANY INFORMATION', 14, true);
addText(`Company Name: ${getValue('companyName')}`);
addText(`Date: ${getValue('dateOfAgreeemnt')} `);
addText(`Date of incorporation: ${getValue('yearOfIncorporation')}`);
addText(`Company Registration Number: ${getValue('registrationNumber')}`);
addText(`Country of registration: ${getValue('countryOfRegistration')}`);
addText(`Registered address: ${getValue('registeredAddress')}`);
addText(`Zip Code: ${getValue('zipCode')}`);
addText(`City: ${getValue('cityOfRegistration')}`);
addText(`Official email address: ${getValue('officialEmail')}`);
addText(`Phone number: ${('phoneNumber')}`);
addText(`First Name: ${getValue('firstName')}`);
addText(`Last Name: ${getValue('lastName')}`);

// Section 2.
addText(`2. Corporate Structure`, 14, true);
addText(`Name(s) of directors: ${getValue('directors')}`);
addText(`First Name: ${getValue('firstName')}`);
addText(`Last Name: ${getValue('lastName')}`);


// Section 3.

// A CONSERVER
const formspreeData = new FormData();
                    for (let [key, value] of formData.entries()) {
                        formspreeData.append(key, value);
                    }
                    formspreeData.append('pdf_attachment', pdfBlob, filename);
                    formspreeData.append('_subject', `New NCNDA: ${formData.get('companyName')}`);

                    const response = await fetch('https://formspree.io/f/xrbyvqrb', {
                        method: 'POST',
                        body: formspreeData,
                        headers: { 'Accept': 'application/json' }
                    });

                    if (!response.ok) throw new Error('Formspree error');

                    successMessage.classList.add('show');
                    form.reset();
                    otherRoleWrapper.style.display = 'none';
                    relationshipDetails.classList.remove('show');
                    
                    setTimeout(() => successMessage.classList.remove('show'), 10000);

                } catch (error) {
                    console.error('Error:', error);
                    alert('Form submitted and PDF downloaded, but email may have failed. Please contact us directly if needed.');
                } finally {
                    submitBtn.disabled = false;
                    loadingOverlay.classList.remove('active');
//