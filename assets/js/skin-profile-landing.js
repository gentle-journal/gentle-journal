(() => {
  'use strict';

  const page = document.querySelector('.skin-profile-landing-page');
  if (!page) return;

  const validCodes = new Set([
    'DSPT', 'DSNT', 'DSPW', 'DSNW',
    'OSPT', 'OSNT', 'OSPW', 'OSNW',
    'ORPT', 'ORNT', 'ORPW', 'ORNW',
    'DRPT', 'DRNT', 'DRPW', 'DRNW'
  ]);

  const dimensions = {
    D: ['Dry', 'Da khô'],
    O: ['Oily', 'Da dầu'],
    S: ['Sensitive', 'Nhạy cảm, dễ kích ứng'],
    R: ['Resistant', 'Ít kích ứng'],
    P: ['Pigmented', 'Có xu hướng gặp vấn đề sắc tố'],
    N: ['Non-Pigmented', 'Ít xu hướng gặp vấn đề sắc tố'],
    W: ['Wrinkle-Prone', 'Có xu hướng xuất hiện nếp nhăn hơn'],
    T: ['Tight', 'Ít xu hướng xuất hiện nếp nhăn hơn']
  };

  const form = page.querySelector('#skin-code-form');
  const input = page.querySelector('#skin-code');
  const error = page.querySelector('#code-error');
  const entry = page.querySelector('#entry-panel');
  const confirmation = page.querySelector('#confirm-panel');
  const confirmationHeading = page.querySelector('#confirm-heading');
  const confirmationCode = page.querySelector('#confirm-code');
  const dimensionList = page.querySelector('#dimension-list');
  const editButton = page.querySelector('#edit-code');
  const confirmButton = page.querySelector('#confirm-result');
  const resultUrl = page.dataset.resultUrl || '/skin-profile/result/';

  if (!form || !input || !error || !entry || !confirmation ||
      !confirmationHeading || !confirmationCode || !dimensionList ||
      !editButton || !confirmButton) return;

  let selectedCode = '';

  const normalize = (value) => String(value || '')
    .replace(/\s+/g, '')
    .toUpperCase();

  const validate = (code) => {
    if (!code) return 'Vui lòng nhập mã Baumann gồm 4 chữ cái.';
    if (code.length !== 4) return 'Mã Baumann cần có đúng 4 chữ cái.';
    if (!/^[A-Z]{4}$/.test(code)) {
      return 'Mã chỉ gồm chữ cái, không gồm số hoặc ký tự khác.';
    }
    if (!validCodes.has(code)) {
      return 'Mã này chưa đúng cấu trúc Baumann. Bạn hãy kiểm tra lại 4 chữ cái trong kết quả quiz.';
    }
    return '';
  };

  const renderDimensions = (code) => {
    dimensionList.replaceChildren();

    code.split('').forEach((letter) => {
      const item = document.createElement('div');
      const topElement = document.createElement('div');
      const letterElement = document.createElement('span');
      const nameElement = document.createElement('strong');
      const descriptionElement = document.createElement('div');

      item.className = 'sp2-dimension';
      topElement.className = 'sp2-dimension-top';
      letterElement.className = 'sp2-letter';
      nameElement.className = 'sp2-name';
      descriptionElement.className = 'sp2-vn';
      letterElement.textContent = letter;
      nameElement.textContent = dimensions[letter][0];
      descriptionElement.textContent = dimensions[letter][1];
      topElement.append(letterElement, nameElement);
      item.append(topElement, descriptionElement);
      dimensionList.append(item);
    });
  };

  const showError = (message) => {
    error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.focus();
  };

  const clearError = () => {
    error.textContent = '';
    input.removeAttribute('aria-invalid');
  };

  input.addEventListener('input', () => {
    const normalized = normalize(input.value);
    if (input.value !== normalized) input.value = normalized;
    clearError();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const code = normalize(input.value);
    input.value = code;

    const validationMessage = validate(code);
    if (validationMessage) {
      showError(validationMessage);
      return;
    }

    clearError();
    selectedCode = code;
    confirmationCode.textContent = code;
    renderDimensions(code);
    entry.hidden = true;
    confirmation.hidden = false;
    confirmationHeading.focus({ preventScroll: true });
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  editButton.addEventListener('click', () => {
    confirmation.hidden = true;
    entry.hidden = false;
    clearError();
    input.focus({ preventScroll: true });
    input.select();
    entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  confirmButton.addEventListener('click', () => {
    if (!validCodes.has(selectedCode)) return;
    window.location.assign(`${resultUrl}?code=${encodeURIComponent(selectedCode)}`);
  });
})();
