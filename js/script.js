var table = $('.table tbody');
var round = 1;
var count = 0;
var totalCara = 0;
var totalCoroa = 0;
var total = 0;
var saldoRound = 8;
var roundsArray = [];

function randomBetween(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function reset(){
  count = 0;
  total+=saldoRound;
  saldoRound = 8;
  totalCara = 0;
  totalCoroa = 0;
  round++;
}

function addCoroa(){
  // console.log('Coroa foi sorteado!');
  table.append(`
    <tr>
      <th scope="row">${round}</th>
      <th scope="row">${count}</th>
      <td>Coroa</td>
      <td>${totalCara}</td>
      <td>${totalCoroa}</td>
      <td>${saldoRound}</td>
      <td>${total + saldoRound}</td>
    </tr>
  `); 
}

function addCara(){
  // console.log('Cara foi sorteado!');
  table.append(`
  <tr>
    <th scope="row">${round}</th>
    <th scope="row">${count}</th>
    <td>Cara</td>
    <td>${totalCara}</td>
    <td>${totalCoroa}</td>
    <td>${saldoRound}</td>
    <td>${total + saldoRound}</td>
  </tr>
`); 
}

function addEachRound(){
  roundsArray.push(saldoRound);
};




$('.btn-add').on('click', function(e) {

  let multiplicador = $(this).attr('data-multiplicador');

    for (let index = 0; index < multiplicador; index++) {
      let sorteado = (randomBetween(1,2));
    
      switch (sorteado) {
        case 1:
          
          count++;
          saldoRound--;
          totalCoroa++;
          if (totalCoroa - totalCara == 3){
            addCoroa();
            addEachRound();
            reset();
          } else {
            addCoroa();
          }
          break;
        case 2:
          
          count++;
          saldoRound--;
          totalCara++;
          if (totalCara - totalCoroa == 3){
            addCara();
            addEachRound();
            reset();
          } else {
            addCara();
          }
          break; 
        default:
          console.log('Erro');
          break;
      }
    }

  

});


$('.btn-calc-media').on('click', function(){
  let media = 0;
  let contador = 0;
  let distancia = 0;
  let desvio = 0;
  let somaQuadradoDistancias = 0;

  for (let i in roundsArray){
    media += roundsArray[i];
    contador++;
  }

  media = media/contador;

  for (let i in roundsArray){
    distancia = roundsArray[i] - media;
    let quadradoDistancia = distancia*distancia;
    somaQuadradoDistancias += quadradoDistancia;
   
  }

  desvio = Math.sqrt(((somaQuadradoDistancias)/(contador)));

  alert(`${media} (Desvio = ${desvio})
    Rodadas: ${contador}
  `);
});

$('.btn-reset').on('click', function(){
  round = 1;
  count = 0;
  totalCara = 0;
  totalCoroa = 0;
  total = 0;
  saldoRound = 8;
  roundsArray = [];
  table.html(` `);
})