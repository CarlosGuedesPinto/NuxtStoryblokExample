export const formatText = (text: string) => {

  if (!text) {
    return text;
  }

  let formattedText = text;

  if (formattedText.startsWith('/azul/')) {
    formattedText = formattedText.replace('/azul/', '');
    formattedText = `<span class="blue-text semibold no-underline">${formattedText}</span>`;
  }

  formattedText = formattedText.replace(/\n/g, '<br>');

  const regex = /\(([^)]+)\)\s*\[([^\]]+)\]/g;

  formattedText = formattedText.replace(regex, (match, p1, p2) => {
    return `<a href="${p2}" target="_blank" style="text-decoration: underline;">${p1}</a>`;
  });

  formattedText = formattedText.replace(/<bold>(.*?)<bold>/g, '<span class="extrabold">$1</span>');

  if (formattedText.includes('(-)')) {
    const lines = formattedText.split('<br>');
    let result = '';
    let listItems = '';
    let insideList = false;

    lines.forEach(line => {
      if (line.trim().startsWith('(-)')) {
        if (!insideList) {
          insideList = true;
          result += '<ul class="text__ul">';
        }
        listItems += `<li>${line.replace('(-)', '').trim()}</li>`;
        
      } else {
        if (insideList) {
          insideList = false;
          result += `${listItems}</ul>`;
          listItems = '';
        }
        result += `${line}<br>`;
      }
    });

    if (insideList) {
      result += `${listItems}</ul>`;
    }

    formattedText = result;
  }

  if (formattedText.includes('(1.)')) {
    const lines = formattedText.split('<br>');
    let result = '';
    let linesStack: number[] = [];

    const isNumberedList = (line: string) => /^\(\d+\.\)/.test(line);
    const isLetteredList = (line: string) => /^\([a-h]\.\)/.test(line);
    const isRomanList = (line: string) => /^\([ivxlcdm]+\.\)/i.test(line);

    lines.forEach(line => {
      if(isNumberedList(line)) {
        linesStack.push(1);
      }
      else if(isLetteredList(line)) {
        linesStack.push(2);
      }
      else if(isRomanList(line)) {
        linesStack.push(3);
      }
    });

    result += '<ol>';
    linesStack.forEach((lineType, index) => {
      const line = lines[index];
      if(lineType === 1) {
        result += `<li>${line.replace(/^\(\d+\.\)/, '').trim()}</li>`;
      }
      else if(lineType === 2) {
        if (linesStack[index - 1] === 1) {
          result += '<ol type="a">';
        }
        result += `<li>${line.replace(/^\([a-h]\.\)/, '').trim()}</li>`;
        if (linesStack[index + 1] === 1) {
          result += '</ol>';
        }
      }
      else if(lineType === 3) {
        if (linesStack[index - 1] === 2) {
          result += '<ol type="i">';
        }
        result += `<li>${line.replace(/^\([ivxlcdm]+\.\)/i, '').trim()}</li>`;
        if (linesStack[index + 1] === 2) {
          result += '</ol>';
        }
        if (linesStack[index + 1] === 1) {
          result += '</ol></ol>';
        }
      }
    });

    result += '</ol>';

    formattedText = result;
  };

  return formattedText;
};