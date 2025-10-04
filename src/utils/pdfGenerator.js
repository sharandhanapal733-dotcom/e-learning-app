import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateCertificatePDF = async (certificateData) => {
  const {
    studentName,
    courseTitle,
    completionDate,
    score,
    courseLevel,
    studentId
  } = certificateData;

  // Create a temporary div to render the certificate
  const certificateDiv = document.createElement('div');
  certificateDiv.style.width = '1200px';
  certificateDiv.style.height = '848px'; // A4 ratio
  certificateDiv.style.padding = '0';
  certificateDiv.style.margin = '0';
  certificateDiv.style.background = 'linear-gradient(45deg, #fff, #f9f9f9)';
  certificateDiv.style.position = 'fixed';
  certificateDiv.style.left = '-9999px';
  certificateDiv.style.top = '0';
  certificateDiv.style.zIndex = '-9999';

  certificateDiv.innerHTML = `
    <div id="certificate-content" style="
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #fff, #f9f9f9);
      border: 25px solid #f4d03f;
      padding: 60px;
      text-align: center;
      font-family: 'Georgia', serif;
      color: #2c3e50;
      position: relative;
      box-sizing: border-box;
    ">
      <!-- Decorative Border -->
      <div style="
        position: absolute;
        top: 30px;
        left: 30px;
        right: 30px;
        bottom: 30px;
        border: 3px solid #f4d03f;
        pointer-events: none;
      "></div>
      
      <!-- Logo/Header -->
      <div style="margin-bottom: 40px;">
        <div style="
          font-size: 48px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 10px;
          letter-spacing: 3px;
        ">LEARNHUB</div>
        <div style="
          font-size: 18px;
          color: #7f8c8d;
          letter-spacing: 8px;
        ">ACADEMY</div>
      </div>

      <!-- Main Title -->
      <h1 style="
        font-size: 42px;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 30px;
        letter-spacing: 2px;
      ">Certificate of Completion</h1>
      
      <!-- This certifies text -->
      <p style="
        font-size: 20px;
        color: #7f8c8d;
        margin-bottom: 40px;
        line-height: 1.6;
      ">
        This is to certify that
      </p>
      
      <!-- Student Name -->
      <h2 style="
        font-size: 36px;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 3px solid #f4d03f;
        display: inline-block;
        min-width: 600px;
      ">${studentName}</h2>
      
      <!-- Completion Text -->
      <p style="
        font-size: 20px;
        color: #7f8c8d;
        margin-bottom: 30px;
        line-height: 1.6;
      ">
        has successfully completed the course
      </p>
      
      <!-- Course Title -->
      <h3 style="
        font-size: 28px;
        color: #667eea;
        margin-bottom: 40px;
        font-weight: 600;
      ">${courseTitle}</h3>
      
      <!-- Score and Details -->
      <p style="
        font-size: 18px;
        color: #7f8c8d;
        margin-bottom: 50px;
        line-height: 1.6;
      ">
        with an overall proficiency score of <strong style="color: #2c3e50;">${score}%</strong>
      </p>

      <!-- Details Grid -->
      <div style="
        display: flex;
        justify-content: space-around;
        margin-top: 60px;
        padding-top: 30px;
        border-top: 2px solid #bdc3c7;
        font-size: 16px;
      ">
        <div>
          <div style="font-weight: bold; margin-bottom: 5px;">Date Completed</div>
          <div>${completionDate}</div>
        </div>
        
        <div>
          <div style="font-weight: bold; margin-bottom: 5px;">Course Level</div>
          <div>${courseLevel}</div>
        </div>

        <div>
          <div style="font-weight: bold; margin-bottom: 5px;">Student ID</div>
          <div>#${studentId}</div>
        </div>
      </div>

      <!-- Signature Area -->
      <div style="
        display: flex;
        justify-content: space-between;
        margin-top: 60px;
        padding-top: 30px;
      ">
        <div style="text-align: center;">
          <div style="
            border-top: 2px solid #2c3e50;
            width: 200px;
            margin-bottom: 10px;
          "></div>
          <div style="font-size: 14px; color: #7f8c8d;">Instructor Signature</div>
        </div>
        
        <div style="text-align: center;">
          <div style="
            border-top: 2px solid #2c3e50;
            width: 200px;
            margin-bottom: 10px;
          "></div>
          <div style="font-size: 14px; color: #7f8c8d;">Academic Director</div>
        </div>
      </div>

      <!-- Footer -->
      <div style="
        margin-top: 40px;
        font-size: 12px;
        color: #95a5a6;
        line-height: 1.4;
      ">
        <div>This certificate verifies that ${studentName} has successfully completed all requirements</div>
        <div>for the ${courseTitle} course offered by LearnHub Academy.</div>
        <div>Certificate ID: ${generateCertificateId()}</div>
      </div>
    </div>
  `;

  document.body.appendChild(certificateDiv);

  try {
    // Convert to canvas
    const canvas = await html2canvas(certificateDiv, {
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: null
    });

    // Remove temporary div
    document.body.removeChild(certificateDiv);

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    
    return pdf;
  } catch (error) {
    document.body.removeChild(certificateDiv);
    throw new Error('Failed to generate PDF: ' + error.message);
  }
};

// Generate unique certificate ID
const generateCertificateId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `LH${timestamp}${random}`.toUpperCase();
};

// Alternative simple PDF version (without html2canvas)
export const generateSimpleCertificatePDF = (certificateData) => {
  const {
    studentName,
    courseTitle,
    completionDate,
    score,
    courseLevel,
    studentId
  } = certificateData;

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Set background color
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, 297, 210, 'F');

  // Add border
  pdf.setDrawColor(244, 208, 63);
  pdf.setLineWidth(8);
  pdf.rect(10, 10, 277, 190);

  // Title
  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  pdf.text('Certificate of Completion', 148, 50, { align: 'center' });

  // This certifies text
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(127, 140, 141);
  pdf.text('This is to certify that', 148, 80, { align: 'center' });

  // Student name
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  pdf.text(studentName, 148, 110, { align: 'center' });

  // Line under name
  pdf.setDrawColor(244, 208, 63);
  pdf.setLineWidth(2);
  pdf.line(80, 115, 217, 115);

  // Completion text
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(127, 140, 141);
  pdf.text('has successfully completed the course', 148, 130, { align: 'center' });

  // Course title
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(102, 126, 234);
  pdf.text(courseTitle, 148, 150, { align: 'center' });

  // Score
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(127, 140, 141);
  pdf.text(`with an overall proficiency score of ${score}%`, 148, 165, { align: 'center' });

  // Details
  pdf.setFontSize(12);
  pdf.text(`Date: ${completionDate}`, 50, 180);
  pdf.text(`Level: ${courseLevel}`, 148, 180, { align: 'center' });
  pdf.text(`Student ID: #${studentId}`, 247, 180, { align: 'right' });

  // Certificate ID
  pdf.setFontSize(10);
  pdf.setTextColor(149, 165, 166);
  pdf.text(`Certificate ID: ${generateCertificateId()}`, 148, 195, { align: 'center' });

  return pdf;
};