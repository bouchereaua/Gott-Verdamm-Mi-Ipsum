/*
* Elsass Ipsum - v1.0 - 24/08/2015
* Copyright (c) 2015 Aymeric Bouchereau; Licensed CC BY-SA 4.0
*/
var loremGotFotamiIpsum = new function(){
    // variables d'instance
    this.paramSentence = [6,15];
    this.paramParagraph = [8,14];
    this.paramWords = ["lorem","ipsum","dolor","sit","amet","elsass","schnapsum","wurscht","'s ìsch", "nìt", "schlìmm","zitt","schmutz","a","güeta","kneckes","luftibüs","rìchtiger","sauistàll","alles", "zum", "geburtstàg","bisch", "denn", "vun", "alle", "güete", "geischter", "verlonn","d'Angala", "dian", "bredala", "bàche","d'r", "beck", "müass", "rich", "wara", "bür", "brìngt's", "ìhm", "noch ìn d Kuch","do", "wurd", "elsassisch", "geredt","drackeimerpilote","dü", "gliichsch", "ìn'ma", "seeraiwer", "Mülhuser", "Wàggis","flàmmeküeche","frèiheit","füli", "résser", "schwìtze", "schnell !","geburtsdäj","gott", "verdamm", "mi","gott verdàmm'mi noch a Mol !","hop komm!","hopla","hopla geiss","ìch redd Elsassisch","stolz","sàg","ich","wìnsch","wìnter","schissabibala","jetz geht's los","kàmpüs","kìrch","kugelhopf","maidala","Elsasser","mennele","vielmols","schmutzele","prima","scheena","seckla","vìel","wasser","DNA","Strasbourg","meteor","riesling","gewurztraminer","munster","knepfle","baeckeoffe","spatzle","Racing","Meinau","Geisberg","Bergheim","Neuhof","Cronenbourg","Neudorf","Langstross","Colmar","Lorentz","souffelweyersheim","koenigsbourg","schluk","stuck","knack","coop","heineken","s'gilt","picon",""];
    
    // Functions
    this.shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };
    this.getARandomNumberBetween = function(min,max){
        return Math.floor(Math.random()*(max-min+1)) + min;
    };
    this.generateIpsum = function(nb,type,p){
        switch(type){
            case "paragraph":
                var paragraphs = new Array();
                var i = 0;
                while(i<nb){
                    var length = this.getARandomNumberBetween(this.paramParagraph[0],this.paramParagraph[1]);
                    var paragraph = this.generateIpsum(length,"sentence");
                    if(p){paragraphs.push("<p>"+paragraph+"</p>");}
                    else{paragraphs.push(""+paragraph+"");}
                    i++;
                }
                return paragraphs.join("\n");
                break;
            case "sentence":
                var sentences = new Array();
                var i=0;
                while(i<nb){
                    var length = this.getARandomNumberBetween(this.paramSentence[0],this.paramSentence[1]);
                    var words = this.generateIpsum(length,"word").split(" ");
                    words[0] = words[0].substr(0,1).toUpperCase() + words[0].substr(1);
                    var sentence = words.join(" ");
                    sentences.push(sentence);
                    i++;
                }
                return (sentences.join('. ') + '.').replace(/(\.\,|\,\.)/g, '.');
                break;
            case "word":
                var index = this.getARandomNumberBetween(0,(this.paramWords.length - nb - 1));
                return this.paramWords.slice(index,(index+nb)).join(" ").replace(/\.|\,/g,'');
                break;
        }
    }
}

// Launch ipsum generator !
document.addEventListener("DOMContentLoaded",function(event){
    loremGotFotamiIpsum.paramWords = loremGotFotamiIpsum.shuffle(loremGotFotamiIpsum.paramWords);
    document.getElementById("res").value = loremGotFotamiIpsum.generateIpsum(1,"paragraph",true); 
    selectIpsum();
});
document.getElementById("apropos").addEventListener("click",function(){
    alert("Elsass Ipsum est une adaptation du traditionnel texte de remplissage Lorem Ipsum. Il s'agit de mots issus du patois anciennement parlé en Alsace (France), l'alsacien. \n\nLa création de l'extension a été inspirée par le Schnapsum (lorem ipsum alsacien) mis en ligne par Alsacréations (http://www.alsacreations.com/page/schnapsum/)."); 
});
document.getElementById("selectionner").addEventListener("click",function(){
    selectIpsum();
});
document.getElementById("generer").addEventListener("click",function(){
    var nbParagraph = document.getElementById("nbParagraph").value;
    var isBaliseP = document.getElementById("baliseP").checked;
    loremGotFotamiIpsum.paramWords = loremGotFotamiIpsum.shuffle(loremGotFotamiIpsum.paramWords);
    document.getElementById("res").value = loremGotFotamiIpsum.generateIpsum(nbParagraph,"paragraph",isBaliseP); 
    selectIpsum();
});
function selectIpsum(){
    document.getElementById("res").focus();
    document.getElementById("res").select();
}