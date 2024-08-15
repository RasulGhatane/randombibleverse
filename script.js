(function() {
    $(document).ready(function() {
        getVerse(); // Load a verse when the page is ready
    });

    $("#fetchVerseButton").click(function() {
        getVerse(); // Load a new verse when the button is clicked
    });

    function getVerse() {
        $("#spinner").show(); // Show the spinner while fetching data
        console.log('Spinner is shown');
        
        $.ajax({
            url: "https://labs.bible.org/api/?passage=random&type=json&callback=?",
            dataType: 'jsonp', // Use JSONP to handle cross-domain requests
            success: function(result) {
                console.log(result); // Log the response for debugging
                if (result && result.length > 0) {
                    $("#newQuote").html('<strong>' +
                        result[0].bookname +
                        ' ' + result[0].chapter +
                        ':' + result[0].verse +
                        '</strong> ' +
                        result[0].text);
                    
                    // Reinitialize NETBibleTagger if it’s defined
                    if (typeof NETBibleTagger !== 'undefined') {
                        NETBibleTagger.process();
                    }
                } else {
                    $("#newQuote").html('No verse found.');
                }
                $("#spinner").hide(); // Hide the spinner after data is loaded
            },
            error: function(xhr, status, error) {
                $("#newQuote").html('Error fetching verse. Please try again.');
                $("#spinner").hide(); // Hide the spinner if there’s an error
                console.error('Error fetching verse:', status, error); // Log error to console
            }
        });
    }
})();
