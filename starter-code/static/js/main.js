// Handle submission of the analyze form
$('#analyze_text').on('click', function() {
  // Take contents of the input
  var comment_text = $('#comment_query').val()
  // Validate that the comment is not empty
  if (comment_text.length <= 0) return false

  // Ajax Request
  $.ajax({
    url: 'analyze',
    method: 'POST',
    data: { text: comment_text },
    beforeSend: function() {
      $('#loader').fadeIn()
    },
    success: function(response) {
      console.log('response', response)
      $('#loader').fadeOut()
      $('#results').html('')
      $('#results_text').html('')

      // Add main sentence
      $('#result_text').html(
        "<p>Watson is <span class='confidence'>" +
          (response['classes'][0]['confidence'] * 100).toFixed(2) +
          "%</span> confident that this comment is: <span class='class_name'>" +
          response['classes'][0]['class_name'] +
          '</span></p>'
      )

      response['classes'].forEach(function(element, index) {
        $('#results').append(
          "<a class='list-group-item' href='#'>" +
            element['class_name'] +
            ' (' +
            (element['confidence'] * 100).toFixed(2) +
            '%)</a>'
        )
      })

      $(window).scrollTop($('#results').offset().top)
    },
  })

  return false
})
