import { jsPDF } from 'jspdf';

export interface PDFOptions {
  filename?: string;
  orientation?: 'portrait' | 'landscape';
  format?: 'a4' | 'letter' | 'legal';
  margin?: number;
}

export const generatePDFFromElement = async (
  element: HTMLElement,
  options: PDFOptions = {}
): Promise<void> => {
  const {
    filename = 'curriculum-plan.pdf',
    orientation = 'portrait',
    format = 'a4',
    margin = 20
  } = options;

  try {
    console.log('Starting PDF generation from markdown...');
    
    // Create PDF
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format
    });
    console.log('PDF created successfully');

    // Get the week data from the element's data attributes or parse it
    const weekData = element.getAttribute('data-week');
    if (!weekData) {
      throw new Error('No week data found in element');
    }

    const week = JSON.parse(weekData);
    
    // Generate markdown content
    const markdownContent = generateCurriculumMarkdown(week);
    
    // Convert markdown to PDF
    await addMarkdownToPDF(pdf, markdownContent, margin);
    
    // Save the PDF
    pdf.save(filename);
    console.log('PDF saved successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const generateCurriculumMarkdown = (week: any): string => {
  let markdown = '';
  
  // Header
  markdown += `# Weekly Curriculum Plan\n\n`;
  markdown += `**${week.term.name} - Week ${week.number}**\n\n`;
  markdown += `**Theme:** ${week.title || 'Theme TBD'}\n\n`;
  markdown += `**Duration:** ${formatDate(week.startDate)} → ${formatDate(week.endDate)}\n\n`;
  markdown += `**Generated:** ${new Date().toLocaleDateString()}\n\n`;
  markdown += `---\n\n`;
  
  // Week Overview
  markdown += `## Week Overview\n\n`;
  markdown += `| Metric | Value |\n`;
  markdown += `|--------|-------|\n`;
  markdown += `| Week Number | ${week.number} |\n`;
  markdown += `| Term | ${week.term.name} |\n`;
  markdown += `| Theme | ${week.title || 'Theme TBD'} |\n`;
  markdown += `| Total Days | ${week.days.length}/5 |\n`;
  markdown += `| Days with Activities | ${week.days.filter((d: any) => Object.keys(d.activities).length > 0).length} |\n`;
  markdown += `| Total Time Slots | ${week.days.reduce((total: number, day: any) => total + Object.keys(day.activities).length, 0)} |\n\n`;
  
  // Curriculum Framework
  markdown += `## Curriculum Framework\n\n`;
  markdown += `### Learning Areas\n`;
  markdown += `- **Numeracy:** Counting, patterns, measurement\n`;
  markdown += `- **Literacy:** Letter recognition, vocabulary, stories\n`;
  markdown += `- **Creative:** Art, music, imaginative play\n\n`;
  
  markdown += `### Development Goals\n`;
  markdown += `- **Motor Skills:** Fine & gross motor development\n`;
  markdown += `- **Social-Emotional:** Self-awareness & relationships\n`;
  markdown += `- **Science:** Exploration & inquiry\n\n`;
  
  markdown += `### Weekly Focus\n`;
  markdown += `- **Theme:** ${week.title || 'Holiday Safety'}\n`;
  markdown += `- **Days:** 5 daily plans\n`;
  markdown += `- **Status:** Ready\n\n`;
  
  // Weekly Learning Goals
  if (week.weeklyPlan?.goals && Object.keys(week.weeklyPlan.goals).length > 0) {
    markdown += `## Weekly Learning Goals\n\n`;
    Object.entries(week.weeklyPlan.goals).forEach(([subject, goals]) => {
      markdown += `### ${subject.charAt(0).toUpperCase() + subject.slice(1)}\n`;
      if (Array.isArray(goals) && goals.length > 0) {
        goals.forEach((goal: string) => {
          markdown += `- ${goal}\n`;
        });
      } else {
        markdown += `- No specific goals set\n`;
      }
      markdown += `\n`;
    });
  }
  
  // Stretch Curriculum
  if (week.weeklyPlan?.stretch) {
    markdown += `## Stretch Curriculum Activities\n\n`;
    
    // Learning Areas
    if (week.weeklyPlan.stretch.numeracy || week.weeklyPlan.stretch.literacy || week.weeklyPlan.stretch.creative) {
      markdown += `### Learning Areas\n\n`;
      if (week.weeklyPlan.stretch.numeracy) {
        markdown += `**Numeracy:** ${week.weeklyPlan.stretch.numeracy}\n\n`;
      }
      if (week.weeklyPlan.stretch.literacy) {
        markdown += `**Literacy:** ${week.weeklyPlan.stretch.literacy}\n\n`;
      }
      if (week.weeklyPlan.stretch.creative) {
        markdown += `**Creative Arts:** ${week.weeklyPlan.stretch.creative}\n\n`;
      }
    }
    
    // Development Areas
    if (week.weeklyPlan.stretch.motor || week.weeklyPlan.stretch.socialEmotional || week.weeklyPlan.stretch.scienceInquiry) {
      markdown += `### Development Areas\n\n`;
      if (week.weeklyPlan.stretch.motor) {
        markdown += `**Motor Skills:**\n`;
        if (week.weeklyPlan.stretch.motor.fine) markdown += `- Fine: ${week.weeklyPlan.stretch.motor.fine}\n`;
        if (week.weeklyPlan.stretch.motor.gross) markdown += `- Gross: ${week.weeklyPlan.stretch.motor.gross}\n`;
        if (week.weeklyPlan.stretch.motor.practicalLife) markdown += `- Practical Life: ${week.weeklyPlan.stretch.motor.practicalLife}\n`;
        markdown += `\n`;
      }
      if (week.weeklyPlan.stretch.socialEmotional) {
        markdown += `**Social-Emotional:** ${week.weeklyPlan.stretch.socialEmotional}\n\n`;
      }
      if (week.weeklyPlan.stretch.scienceInquiry) {
        markdown += `**Science & Inquiry:** ${week.weeklyPlan.stretch.scienceInquiry}\n\n`;
      }
    }
    
    // Resources
    if (week.weeklyPlan.stretch.resources) {
      markdown += `### Resources & Materials\n\n`;
      if (week.weeklyPlan.stretch.resources.books && Array.isArray(week.weeklyPlan.stretch.resources.books)) {
        markdown += `**Books:**\n`;
        week.weeklyPlan.stretch.resources.books.forEach((book: string) => {
          markdown += `- ${book}\n`;
        });
        markdown += `\n`;
      }
      if (week.weeklyPlan.stretch.resources.songs && Array.isArray(week.weeklyPlan.stretch.resources.songs)) {
        markdown += `**Songs:**\n`;
        week.weeklyPlan.stretch.resources.songs.forEach((song: string) => {
          markdown += `- ${song}\n`;
        });
        markdown += `\n`;
      }
      if (week.weeklyPlan.stretch.resources.materials && Array.isArray(week.weeklyPlan.stretch.resources.materials)) {
        markdown += `**Materials:**\n`;
        week.weeklyPlan.stretch.resources.materials.forEach((material: string) => {
          markdown += `- ${material}\n`;
        });
        markdown += `\n`;
      }
    }
  }
  
  // Weekly Notes
  if (week.weeklyPlan?.notes) {
    markdown += `## Weekly Notes & Resources\n\n`;
    markdown += `${week.weeklyPlan.notes}\n\n`;
  }
  
  // Daily Plans
  markdown += `## Daily Activity Plans\n\n`;
  if (week.days.length > 0) {
    week.days.forEach((day: any) => {
      markdown += `### ${formatDayOfWeek(day.dayOfWeek)} - ${formatDate(day.date)}\n\n`;
      markdown += `**Time Slots:** ${Object.keys(day.activities).length}\n\n`;
      
      if (Object.keys(day.activities).length > 0) {
        markdown += `| Time Slot | Learning Area | Activity Description |\n`;
        markdown += `|-----------|---------------|---------------------|\n`;
        
        Object.entries(day.activities).forEach(([timeSlot, activities]) => {
          if (Array.isArray(activities) && activities.length > 0) {
            activities.forEach((activity: any) => {
              markdown += `| ${timeSlot} | ${activity.area} | ${activity.activity} |\n`;
            });
          } else {
            markdown += `| ${timeSlot} | No activities | No activities planned |\n`;
          }
        });
        markdown += `\n`;
      }
      
      if (day.reflections) {
        markdown += `**Daily Reflections:** ${day.reflections}\n\n`;
      }
      
      markdown += `---\n\n`;
    });
  } else {
    markdown += `No daily plans have been generated yet.\n\n`;
  }
  
  // Footer
  markdown += `---\n\n`;
  markdown += `*This document was generated from the Curriculum Builder application*\n`;
  markdown += `*For questions or updates, please contact your curriculum coordinator*\n`;
  
  return markdown;
};

const addMarkdownToPDF = async (pdf: jsPDF, markdown: string, margin: number): Promise<void> => {
  const lines = markdown.split('\n');
  const pageHeight = pdf.internal.pageSize.getHeight();
  const lineHeight = 6;
  let yPosition = margin;
  let currentPage = 1;
  
  for (const line of lines) {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      pdf.addPage();
      currentPage++;
      yPosition = margin;
    }
    
    // Handle different markdown elements
    if (line.startsWith('# ')) {
      // H1 - Main title
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text(line.substring(2), margin, yPosition);
      yPosition += lineHeight * 2;
    } else if (line.startsWith('## ')) {
      // H2 - Section title
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text(line.substring(3), margin, yPosition);
      yPosition += lineHeight * 1.5;
    } else if (line.startsWith('### ')) {
      // H3 - Subsection title
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text(line.substring(4), margin, yPosition);
      yPosition += lineHeight * 1.2;
    } else if (line.startsWith('|')) {
      // Table row
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      
      // Simple table parsing
      const cells = line.split('|').filter(cell => cell.trim());
      if (cells.length > 0) {
        const cellWidth = (pdf.internal.pageSize.getWidth() - margin * 2) / cells.length;
        cells.forEach((cell, index) => {
          const x = margin + (index * cellWidth);
          pdf.text(cell.trim(), x, yPosition);
        });
        yPosition += lineHeight;
      }
    } else if (line.startsWith('- ')) {
      // List item
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.text(line, margin + 5, yPosition);
      yPosition += lineHeight;
    } else if (line.startsWith('**') && line.endsWith('**')) {
      // Bold text
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'bold');
      pdf.text(line.substring(2, line.length - 2), margin, yPosition);
      yPosition += lineHeight;
    } else if (line === '---') {
      // Horizontal rule
      yPosition += lineHeight;
      pdf.line(margin, yPosition, pdf.internal.pageSize.getWidth() - margin, yPosition);
      yPosition += lineHeight;
    } else if (line.trim() === '') {
      // Empty line
      yPosition += lineHeight * 0.5;
    } else {
      // Regular text
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      
      // Handle long lines by wrapping
      const maxWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const words = line.split(' ');
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const textWidth = pdf.getTextWidth(testLine);
        
        if (textWidth > maxWidth && currentLine) {
          pdf.text(currentLine, margin, yPosition);
          yPosition += lineHeight;
          currentLine = word;
          
          // Check if we need a new page
          if (yPosition > pageHeight - margin) {
            pdf.addPage();
            currentPage++;
            yPosition = margin;
          }
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine) {
        pdf.text(currentLine, margin, yPosition);
        yPosition += lineHeight;
      }
    }
  }
};

const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const formatDayOfWeek = (dayOfWeek: string): string => {
  const days: Record<string, string> = {
    'monday': 'Monday',
    'tuesday': 'Tuesday',
    'wednesday': 'Wednesday',
    'thursday': 'Thursday',
    'friday': 'Friday'
  };
  return days[dayOfWeek.toLowerCase()] || dayOfWeek;
};

export const generatePDFFromTemplate = async (
  templateElement: HTMLElement,
  weekData: any,
  options: PDFOptions = {}
): Promise<void> => {
  console.log('generatePDFFromTemplate called with:', { templateElement, weekData, options });
  
  // Set default filename based on week data
  const defaultFilename = `week-${weekData.number}-${weekData.term.name.toLowerCase()}.pdf`;
  console.log('Default filename:', defaultFilename);
  
  const pdfOptions: PDFOptions = {
    filename: defaultFilename,
    orientation: 'portrait',
    format: 'a4',
    margin: 15,
    ...options
  };
  console.log('PDF options:', pdfOptions);

  return generatePDFFromElement(templateElement, pdfOptions);
};
