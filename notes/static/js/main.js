$(function() {

  $("#edit").hide();
  $("[data-toggle=popover]").popover();


// Load newly created/Updated notes
function newNotes() {
$.ajax({
	type: "GET",
	url: "new_notes",
	data: {
	},
	success: function(result) {
    console.log(result);
    $(".today-notes").load("new_notes");
	}
});
return false;
}


// Load create form
$(".create-note").on("click", function() {
  if ($("#edit").css("display") == 'none') {
  $('.load-create-form').load('create',function(){
    $('.bd-example-modal-lg').modal({show:true});
  });
}
});


// Update form
  function update(id){
    if ($("#edit").css("display") != 'none') {
      $("#edit").css("display", "none");
      $(".load-create-form").css("display", "block");
      $(".preview-data").css("display", "none");
      $("#preview").css("display", "block");
    }
    $('.load-create-form').load('create',function(){
      $("#create-question").val($(`#ques-${id}`).html());
      $('#create-question').prop('readonly', true);
      $("#answer").val($(`#ans-${id}`).html());
      $("#category").val($(`#category-${id}`).html());
      $("#http-link").val($(`#link-${id}`).html());
      $("#file-path").val($(`#doc-${id}`).html());
      $('.bd-example-modal-lg').modal({show:true});
    });
  };
  $(".update-note").on("click", function() {
    update($(this).data("id"));
  });


  // save the note
  $("#save-note").on("click", function() {
    let question = $("#create-question").val();
    let answer = $("#answer").val();
    let category = $("#category").val();
    let link = $("#http-link").val();
    let file = $("#file-path").val();
    $('.bd-example-modal-lg').modal('toggle');
    $.ajax({
      type: 'POST',
      url: 'create',
        data: {
          csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
          ques: question,
          ans: answer,
          category: category,
          link: link,
          doc: file
        },
        success: function(data) {
          console.log(data.status);
          alert(data.status);
          if (data.status.trim() === 'Note Updated'){
            $(`#note${data.id}`).remove();
            }
          newNotes();
        }
    });
    return false;
  });


  // Load Crate Form after Preview
  $("#edit").on("click", function() {
    $("#modal-title").html("Create-Note");
    $("#edit").hide();
    $("#preview").show();
    $(".preview-data").hide();
    $(".load-create-form").show();
    $(".preview-data").html('');
  });


  // Preview the form
  $("#preview").on("click", function() {
    $("#preview").hide();
    $("#edit").show();
    // get
    let title = $("#modal-title").html();
    let question = $("#create-question").val();
    let answer = $("#answer").val();
    let category = $("#category").val();
    let link = $("#http-link").val();
    let file = $("#file-path");
    // change
    $("#modal-title").html("Preview");
    let previewData = "<h5>Q--> " + question + "</h5>";
    previewData += "<p>Ans--> " + answer + "<p>";
    $(".load-create-form").hide();
    $(".preview-data").html(previewData);
    $(".preview-data").show();
  });


  // Delete Note
  $(".delete-note").on("click", function(){
    const id = $(this).data("id");
    console.log(id);
    $(".delete-data").html($(`#ques-${id}`).html());
    $(".delete-data").attr("data-id", id);
    console.log($(this).attr("data-id"));
    $('#exampleModalCenter').modal({show:true});
  });

  $(".confirm-delete").on("click", function() {
    const id = $(".delete-data").attr("data-id");
    console.log(id);
    $.ajax({
      type: 'POST',
      url: 'delete',
      data: {
        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        id: id
      },
      success: function(status) {
        console.log(status.deleted);
        $('#exampleModalCenter').modal('toggle');
        $(`#note${id}`).remove();
        newNotes();
      }
    });
  });

  $("input[type='text']").on("focus", function() {
    // get question via ajax if exist do not create it.
    console.log("hjgjhgjhgjhgjhgj");
    // $.ajax({
    //   type: 'POST',
    //   url: 'ques_exist',
    //   data: {
    //     csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
    //     ques: $(this).val()
    //   },
    //   success: function(status) {
    //     if (status.exists)
    //     alert("question already exists");
    //   }
    // })
  });

  $("#category").on("keydown", function() {
	  // get list of category when focused on input[category]
  });

});