function showConfirmModal(message, callback) {
  $('#confirmModalBody').text(message);
  const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
  $('#confirmModalBtn').off('click').on('click', function () {
    modal.hide();
    callback();
  });
  modal.show();
}

function showAlertModal(message, title) {
  if (title) $('#alertModalTitle').text(title);
  $('#alertModalBody').text(message);
  new bootstrap.Modal(document.getElementById('alertModal')).show();
}

$(document).ready(function () {
  $('.datatable').DataTable({
    pageLength: 25,
    order: [[0, 'desc']],
    language: { search: 'Search:', searchPlaceholder: 'Type to filter...' },
    dom: '<"d-flex justify-content-between align-items-center mb-3"lf>t<"d-flex justify-content-between align-items-center mt-3"ip>'
  });

  $('.datatable-no-sort').DataTable({
    pageLength: 25,
    ordering: false,
    language: { search: 'Search:', searchPlaceholder: 'Type to filter...' }
  });

  if (typeof tinymce !== 'undefined') {
    tinymce.init({
      selector: '.tinymce',
      height: 400,
      branding: false,
      menubar: false,
      plugins: 'link lists code table image',
      toolbar: 'undo redo | bold italic underline | bullist numlist | link image | code',
      content_style: 'body { font-family: system-ui, sans-serif; font-size: 15px; color: #1a1a1a; }'
    });
  }

  flatpickr('.datepicker', { dateFormat: 'Y-m-d' });

  $('[data-confirm]').on('click', function (e) {
    e.preventDefault();
    const target = this;
    showConfirmModal($(target).data('confirm') || 'Are you sure?', function () {
      if (target.tagName === 'A') window.location.href = target.href;
      else if (target.tagName === 'FORM') target.submit();
      else if ($(target).data('action')) window.location.href = $(target).data('action');
    });
  });

  $('[data-form-confirm]').on('submit', function (e) {
    e.preventDefault();
    const form = this;
    showConfirmModal($(form).data('form-confirm') || 'Are you sure?', function () {
      form.submit();
    });
  });

  $('.select-all').on('change', function () {
    $('.' + $(this).data('target')).prop('checked', this.checked);
  });

  $('[data-bulk-action]').on('click', function () {
    const ids = $('.' + $(this).data('target') + ':checked').map(function () { return this.value; }).get();
    if (ids.length === 0) return showAlertModal('Select items first.');
    const btn = this;
    showConfirmModal('Confirm action for ' + ids.length + ' item(s)?', function () {
      $(btn).data('ids', ids.join(','));
      window.location.href = $(btn).data('bulk-action') + '&ids=' + ids.join(',');
    });
  });
});

function previewImage(input, imgId) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) { $('#' + imgId).attr('src', e.target.result).show(); };
    reader.readAsDataURL(input.files[0]);
  }
}
