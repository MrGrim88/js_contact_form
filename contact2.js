var submittable = false;

function newRow() {
    var row = document.createElement('div');
    row.className ='row';
    return row;
}
function newColumn() {
    var div = document.createElement('div');
    div.className = 'col-md-12 col-lg-12 col-xs-12 col-sm-12 col-xl-12';
    return div;
}
jQuery(document).ready(function() {
    var fields = [
        {
            type: 'hidden',
            name: 'website',
            id: 'website',
            label: '',
            value: document.location.href,
        },
        {
            type: 'text',
            name: 'name',
            id: 'name',
            label: 'Your Name',
            required: 'required',
        },
        {
            type: 'from',
            name: 'email',
            id: 'email',
            label: 'E-Mail',
            required: 'required',
        },
        {
            type: 'phone',
            name: 'phone',
            id: 'phone',
            label: 'Phone',
        },
        {
            type: 'text',
            name: 'subject',
            id: 'subject',
            label: 'Subject',
        },
        {
            type: 'textarea',
            name: 'msg',
            id: 'msg',
            label: 'Message',
        },
    ];
    var dest = document.getElementById('rm-contact-form');
    if (dest != undefined) {
        dest.innerHTML = '';
        var frm = document.getElementById('rm-form');
        for (var i = 0; i < fields.length; i++) {
            var row = newRow();
            var col = newColumn();
            row.appendChild(col);
            if (fields[i].type !== 'textarea') {
                if (fields[i].label !== '') {
                    var label = document.createElement('label');
                    label.setAttribute('for', fields[i].name);
                    label.innerHTML = fields[i].label;
                    if (fields[i].required == 'required') {label.innerHTML += ' (*)'; }
                    label.innerHTML += ': ';
                    label.className = 'control-label';
                    col.appendChild(label);
                }
                var field = document.createElement('input');
                field.setAttribute('type', fields[i].type);
                field.name = fields[i].name;
                field.id = fields[i].id;
                field.className = 'form-control';
                if (fields[i].value !== undefined) { field.value = fields[i].value; }
                if (fields[i].required == 'required') { field.setAttribute('required', fields[i].required); }
                col.appendChild(field);
                frm.appendChild(row);
            } else {
                var label = document.createElement('label');
                label.setAttribute('for', fields[i].name);
                label.innerHTML = fields[i].label;
                label.className = 'control-label';
                var field = document.createElement('textarea');
                field.name = fields[i].name;
                field.id = fields[i].id;
                field.className = 'form-control';
                field.maxLength = 1000;
                field.cols = '10';
                field.rows = '5';
                col.appendChild(label);
                col.appendChild(field);
                frm.appendChild(row);
            }
        }
        var row = newRow();
        var col = newColumn();
        var btn = document.createElement('input');
        btn.setAttribute('type','button');
        btn.id = 'submitForm';
        btn.value = 'Submit';
        btn.className = 'btn btn-primary';
        row.appendChild(col);
        col.appendChild(btn);
        frm.appendChild(row);
        dest.appendChild(frm);
    }
    jQuery('input').change(function() {
        submittable = true;
        jQuery('input').each(function() {
            var a = jQuery(this).attr('required');
            var v = jQuery(this).val();
            if (a == 'required' && v === '') { submittable = false; }
        });
        //console.log('Submittable: ' + submittable);
    });
    jQuery('#submitForm').click(function() {
        var params = jQuery('#rm-form').serialize();
        var d = document.getElementById('rm-status');
        if (d == undefined) {
            var d = document.createElement('div');
            d.id = 'rm-status';
            jQuery('#rm-form').append(d);
        }
        if (submittable === true) {
            jQuery.ajax({
              type: 'GET',
              url: 'https://www.rest.com/endpoint/for/message/handling',
              data: params,
              success: function(data) {
                  data = JSON.parse(data);
                  if (data.results == true) {
                      if (d !== undefined) {
                        d.className = 'alert alert-success';
                        d.innerHTML = 'Your form has been submitted.';
                      }
                    jQuery('input').each(function(){
                        jQuery(this).val('');
                    });
                    jQuery('textarea').each(function(){
                        jQuery(this).val('');
                    });
                  } else {
                      if (d !== undefined) {
                          d.className = 'alert alert-danger';
                          d.innerHTML = 'Your failed to send.  Please try again.';
                      }
                  }
                  if (d !== undefined) {
                      jQuery('#contactForm').append(d);
                  }
              },
            });
        } else {
            d.className = 'alert alert-warning';
            d.innerHTML = 'Required Fields are empty.';
        }
    });
});
