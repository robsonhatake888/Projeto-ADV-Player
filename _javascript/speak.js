

$(function(){
    if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = function() {
            var $voicelist = $('#voices');

            if($voicelist.find('option').length == 0) {
                speechSynthesis.getVoices().forEach(function(voice, index) {
                    var $option = $('<option>')
                        .val(index)
                        .html(voice.name + (voice.default ? ' (default)' :''));

                    $voicelist.append($option);
                });

                $voicelist.material_select();
            }
        }

        $('#speak').click(function(){

            var texto = "url(../_media/MonstrosSA.adv)";
            var text = new Text(texto);
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[$('#voices').val()];
            msg.rate = $('#rate').val() / 10;
            msg.pitch = $('#pitch').val();
            //msg.text = "url(../_media/MonstrosSA.adv)";


            var dados = text.split('\n');
            msg.text =  dados[3];
            speechSynthesis.speak(msg);




            //for(  var i=0; i< dados.length; i++){
                //msg.text = dados[i];
                //speechSynthesis.speak(msg);
                //i++;
            //}

            //speechSynthesis.speak(msg);
        })
    } else {
        $('#modal1').openModal();
    }
});
