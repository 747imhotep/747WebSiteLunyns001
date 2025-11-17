/* ============================================
   LUNYNS Ltd. NCNDA
   javascript File
   ============================================ */
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
                doc.setFontSize(36);
                doc.setFont(undefined, 'normal');
                doc.text('NCNDA', 15, 35); // Title
                doc.setFontSize(20);
                doc.text('NON-CIRCUMVENTION', 15, 42); // Subtitle 
                doc.text('NON-DISCLOSURE AND', 15, 49); // Subtitle 
                doc.text('WORKING AGREEMENT', 15, 56); // Subtitle 
                
                // 🔽 Draw horizontal line under subtitle
                doc.setLineWidth(0.2); // optional — default is 1
                doc.line(15, 45, 195, 45); // from (x=15, y=45) to (x=195, y=45)
                
                doc.setTextColor(0, 0, 0);
                y = 50;

                const now = new Date().toLocaleString('en-GB');
                addText(`Submitted on: ${now}`, 10);
                y += 5;

                // Section 1
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
                addText(`Phone number: ${getValue('phoneNumber')}`);
                addText(`First Name: ${getValue('firstName')}`);
                addText(`Last Name: ${getValue('lastName')}`);
                y += 5;

                // Section 2
                addText('2. CORPORATE STRUCTURE', 14, true);
                addText(`Shareholders: ${getValue('shareholders')}`);
                addText(`Directors: ${getValue('directors')}`);
                y += 5;

                // Section 3
                addText('3. BANKING INFORMATION', 14, true);
                addText(`Bank Name: ${getValue('bankName')}`);
                addText(`Bank Address: ${getValue('bankAddress')}`);
                addText(`Account Holder: ${getValue('accountHolder')}`);
                y += 5;

                // Section 4
                addText('4. BUSINESS ACTIVITY', 14, true);
                addText(`Main Activities: ${getValue('businessDescription')}`);
                const role = formData.get('transactionRole') || 'Not specified';
                const otherRole = role === 'Other' ? ` (${getValue('otherRole')})` : '';
                addText(`Transaction Role: ${role}${otherRole}`);
                y += 5;

                // Section 5
                addText('5. Relationship with the Supplyer or the REFINERY', 14, true);
                const authorized = formData.get('authorizedToRepresent') || 'Not specified';
                addText(`Authorized to Represent: ${authorized}`);
                if (authorized === 'Yes') {
                    addText(`Relationship Nature: ${getValue('relationshipNature')}`);
                    addText(`Mandate Exclusive: ${formData.get('mandateExclusive') || 'Not specified'}`);
                    addText(`Validity Period: ${getValue('mandateValidity')}`);
                }
                y += 5;

                // Section 6
                addText('6. ADDITIONAL DOCUMENTS', 14, true);
                const mandateFiles = document.getElementById('mandateLetter').files;
                const additionalFiles = document.getElementById('additionalDocs').files;
                addText(`Mandate Documents: ${mandateFiles.length > 0 ? Array.from(mandateFiles).map(f => f.name).join(', ') : 'None uploaded'}`);
                addText(`Additional Documents: ${additionalFiles.length > 0 ? Array.from(additionalFiles).map(f => f.name).join(', ') : 'None uploaded'}`);

                // Footer
                // doc.setFontSize(8);
                // doc.setTextColor(100, 100, 100);
                // const footerY = pageHeight - 15;
                // doc.text('LUNYNS Ltd. | Suite A, 82 James Carter Road, Mildenhall, Suffolk, IP28 7DE, UK', 105, footerY, { align: 'center' });
                // doc.text('Email: info@lunyns.com | Website: www.lunyns.com', 105, footerY + 5, { align: 'center' });

                return doc;
            }

            // Form submission
            form.addEventListener('submit', async function(e) {
                e.preventDefault();

                // Validate
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                requiredFields.forEach(field => {
                    if (field.type !== 'radio' && field.type !== 'checkbox' || field.name === 'dataConsent') {
                        if (!validateField(field)) isValid = false;
                    }
                });

                // Validate radio groups
                ['transactionRole', 'authorizedToRepresent'].forEach(name => {
                    const checked = form.querySelector(`input[name="${name}"]:checked`);
                    if (!checked) {
                        const errorEl = document.getElementById(name + 'Error');
                        if (errorEl) errorEl.classList.add('show');
                        isValid = false;
                    }
                });

                if (!document.getElementById('dataConsent').checked) {
                    document.getElementById('dataConsentError').classList.add('show');
                    isValid = false;
                }

                if (!isValid) {
                    alert('Please fill in all required fields');
                    return;
                }

                submitBtn.disabled = true;
                loadingOverlay.classList.add('active');

            try {
                const formData = new FormData(form);
                
                // Generate PDF
                const pdf = await generatePDF(formData);
                const companyName = (formData.get('companyName') || 'Submission').replace(/[^a-zA-Z0-9]/g, '_');
                const filename = `LUNYNS_NCNDA_${companyName}_${Date.now()}.pdf`;
                
                // Download PDF
                pdf.save(filename);
                console.log('✓ PDF downloaded:', filename);
                
                // Get PDF as blob for email
                const pdfBlob = pdf.output('blob');
                console.log('✓ PDF blob size:', pdfBlob.size, 'bytes');
                
                // ⭐ Send to Formspree
            const formDataToSend = new FormData();
            for (let [k, v] of formData.entries()) formDataToSend.append(k, v);
            formDataToSend.append("pdf", pdfBlob, filename);
            formDataToSend.append("subject", `New NCNDA: ${formData.get("companyName")}`);

            const response = await fetch("https://send-pdf-worker.my-workerlunyns.workers.dev", {
            method: "POST",
            body: formDataToSend
            });

             // ⭐ End Send to Formspree
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            successMessage.classList.add('show');
            console.log('✓ Form submitted successfully');

            } catch (err) {
                console.error('Error submitting form:', err);
                alert('An error occurred while submitting the form. Please try again.');
            } finally {
                submitBtn.disabled = false;
                loadingOverlay.classList.remove('active');
            }
        });
    });


//-----------------------------------
            // END OF YOUR CODE
//-----------------------------------