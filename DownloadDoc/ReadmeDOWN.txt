We need to create a secure download page where customers can

Choose 4 types of document to download.

Insert email verification before download the document.

The File will be downoaded directly on the Visitor PC.

Customize the file name dynamically.

Confirm to me that File has been downloaded.

The document is in the /DownloadDoc Folder. 

This Folder is in the same Folder as the html File.


### ✅ Basic Functional Requirements

/project-folder
│
├── index.html
├── /DownloadDoc
│   ├── doc1.pdf
│   ├── doc2.pdf
│   └── ...
├── /IMAGEDO
│   └── DownloadFlag/
├── /DOWNLERCSS
│   └── downloader.css
/* ==================================================================================================================== */


✅ 3. Try These in Order:
✅ Step-by-Step Test:
Step	│ What to Do								│ What Should Happen
1	│ Page loads								│ You see the email input and no download buttons
2	│ Enter invalid email and click "Check"					│ Alert: "Please enter a valid email."
3	│ Enter valid email (like test@example.com) and click "Check"		│ Email field hides, document instructions + download blocks appear with fade-in
4	│ Click any download button						│ File should download with custom name like Document_test_example_com_doc1.pdf
5	│ Check download folder							│ File should exist with renamed filename
6	│ Try clicking a button without entering email (after page reload)	│ Should show alert: "Please verify your email before downloading."
/* ==================================================================================================================== */


🚀 Next Suggestions (if you're planning to improve this)

    Email persistence
    Save the verified email to localStorage so it’s remembered on refresh (optional).

    Basic spam protection
    Rate-limit downloads or add server-side validation of email address.

    Success confirmation after download
    There's already a confirmation message — looks good! we could style it more if possible.

    Accessibility & UX polish
    Add loading states, ARIA roles, and keyboard support for extra polish.
    
/* ==================================================================================================================== */    


    Let me know if you want help:

    Making it mobile-friendly

    Packaging it as a standalone secure page

    Hooking this into a real backend (PHP, Node.js, etc.)

Nice job debugging this — you were close to the finish line!
    
/* ==================================================================================================================== */


I'd like to:

    Add a backend handler (e.g., email logging or download tracking)

    Hook in something like Google reCAPTCHA

    Store email addresses to a database (with consent)
