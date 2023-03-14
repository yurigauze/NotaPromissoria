 function validarCampoVazio(campo) {
  if (campo.value === '') {
    campo.style.border = '2px solid red';
  } else {
    campo.style.border = '';
  }
}

function gerarNotaPromissoria() {
  var valor = document.getElementById("valor").value;
  var data = document.getElementById("data").value;
  var nomeDevedor = document.getElementById("nomeDevedor").value;
  var cpfDevedor = document.getElementById("cpfdevedor").value;
  var cnpjDevedor = document.getElementById("cnpjdevedor").value;
  var enderecoDevedor = document.getElementById("enderecoDevedor").value;
  var escrita = extenso(valor);
  var nomeCredor = document.getElementById("nomeCredor").value;
  var cpfCredor = document.getElementById("cpfcredor").value;
  var cnpjCredor = document.getElementById("cnpjcredor").value;

  document.getElementById("NomeD").innerHTML = nomeDevedor;
  document.getElementById("CPFD").innerHTML = cpfDevedor;
  document.getElementById("CNPJD").innerHTML = cnpjDevedor;
  document.getElementById("enderecoD").innerHTML = enderecoDevedor;
  document.getElementById("nomeC").innerHTML = nomeCredor;
  document.getElementById("datas").innerHTML = data;
  document.getElementById("valores").innerHTML = valor;
  document.getElementById("escritas").innerHTML = escrita;
  document.getElementById("CPFC").innerHTML = cnpjCredor;
  document.getElementById("CNPJC").innerHTML = cpfCredor;



}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  gerarNotaPromissoria();
})

String.prototype.reverse = function () {
  return this.split('').reverse().join('');
};

function mascaraMoeda(campo, evento) {
  var tecla = (!evento) ? window.event.keyCode : evento.which;
  var valor = campo.value.replace(/[^\d]+/gi, '').reverse();
  var resultado = "";
  var mascara = "########.##".reverse();
  for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
    if (mascara.charAt(x) != '#') {
      resultado += mascara.charAt(x);
      x++;
    } else {
      resultado += valor.charAt(y);
      y++;
      x++;
    }
  }
  campo.value = resultado.reverse();
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  if (cpf.length != 11) return false; // CPF deve ter 11 dígitos
  // Verifica se todos os dígitos são iguais
  for (var i = 0; i < 10; i++) {
    if (cpf.charAt(i) != cpf.charAt(i + 1)) break;
  }
  if (i == 10) return false; // Todos os dígitos são iguais
  // Calcula os dois últimos dígitos verificadores
  var soma = 0, resto;
  for (var i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.charAt(9))) return false;
  soma = 0;
  for (var i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.charAt(10))) return document.getElementById("cpf-feedback").innerHTML = "CPF inválido!";;
  document.getElementById("cpf-feedback").innerHTML = "CPF válido!";
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  if (cnpj.length != 14) return false; // CNPJ deve ter 14 dígitos
  // Verifica se todos os dígitos são iguais
  for (var i = 0; i < 13; i++) {
    if (cnpj.charAt(i) != cnpj.charAt(i + 1)) break;
  }
  if (i == 13) return false; // Todos os dígitos são iguais
  // Calcula os dois últimos dígitos verificadores
  var tamanho = cnpj.length - 2;
  var numeros = cnpj.substring(0, tamanho);
  var digitos = cnpj.substring(tamanho);
  var soma = 0;
  var pos = tamanho - 7;
  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0)) return false;
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1)) return document.getElementById("cnpj-feedback").innerHTML = "CNPJ invalido!";;
  document.getElementById("cnpj-feedback").innerHTML = "CNPJ válido!";
}

document.addEventListener('click', function (e) {

  var self = e.target;

  if (['cpfcredor', 'cnpjcredor'].indexOf(self.id) !== -1) {
    var el = document.getElementById(self.id === 'cpfcredor' ? 'cnpjcredor' : 'cpfcredor');

    self.removeAttribute('disabled');

    el.setAttribute('disabled', '');
    el.value = "";
  }
  if (['cpfdevedor', 'cnpjdevedor'].indexOf(self.id) !== -1) {
    var el = document.getElementById(self.id === 'cpfdevedor' ? 'cnpjdevedor' : 'cpfdevedor');

    self.removeAttribute('disabled');

    el.setAttribute('disabled', '');
    el.value = "";
  }
})

function printDiv(id) {
  var divContents = document.getElementById(id).innerHTML;
  var a = window.open('', '', 'height=500, width=500');
  a.document.write('<html><body>');
  a.document.write(divContents);
  a.document.write('</body></html>');
  a.document.close();
  a.print();
  gerarNotaPromissoria();
}

function extenso(vlr) {
  var Num = parseFloat(vlr.replace(/[.;]/g, ''));
  if (vlr == 0) {
    document.getElementById('valor-por-extenso').innerHTML = "zero";
  } else {
    
    var inteiro = parseInt(vlr);; // parte inteira do valor
    if (inteiro < 1000000000000000) {

      var resto = Num.toFixed(2) - inteiro.toFixed(2);       // parte fracionária do valor
      resto = resto.toFixed(2)
      var vlrS = inteiro.toString();

      var cont = vlrS.length;
      var extenso = "";
      var auxnumero;
      var auxnumero2;
      var auxnumero3;

      var unidade = ["", "um", "dois", "três", "quatro", "cinco",
        "seis", "sete", "oito", "nove", "dez", "onze",
        "doze", "treze", "quatorze", "quinze", "dezesseis",
        "dezessete", "dezoito", "dezenove"];

      var centena = ["", "cento", "duzentos", "trezentos",
        "quatrocentos", "quinhentos", "seiscentos",
        "setecentos", "oitocentos", "novecentos"];

      var dezena = ["", "", "vinte", "trinta", "quarenta", "cinquenta",
        "sessenta", "setenta", "oitenta", "noventa"];

      var qualificaS = ["reais", "mil", "milhão", "bilhão", "trilhão"];
      var qualificaP = ["reais", "mil", "milhões", "bilhões", "trilhões"];

      for (var i = cont; i > 0; i--) {
        var verifica1 = "";
        var verifica2 = 0;
        var verifica3 = 0;
        auxnumero2 = "";
        auxnumero3 = "";
        auxnumero = 0;
        auxnumero2 = vlrS.substr(cont - i, 1);
        auxnumero = parseInt(auxnumero2);


        if ((i == 14) || (i == 11) || (i == 8) || (i == 5) || (i == 2)) {
          auxnumero2 = vlrS.substr(cont - i, 2);
          auxnumero = parseInt(auxnumero2);
        }

        if ((i == 15) || (i == 12) || (i == 9) || (i == 6) || (i == 3)) {
          extenso = extenso + centena[auxnumero];
          auxnumero2 = vlrS.substr(cont - i + 1, 1)
          auxnumero3 = vlrS.substr(cont - i + 2, 1)

          if ((auxnumero2 != "0") || (auxnumero3 != "0"))
            extenso += " e ";

        } else

          if (auxnumero > 19) {
            auxnumero2 = vlrS.substr(cont - i, 1);
            auxnumero = parseInt(auxnumero2);
            extenso = extenso + dezena[auxnumero];
            auxnumero3 = vlrS.substr(cont - i + 1, 1)

            if ((auxnumero3 != "0") && (auxnumero2 != "1"))
              extenso += " e ";
          }
          else if ((auxnumero <= 19) && (auxnumero > 9) && ((i == 14) || (i == 11) || (i == 8) || (i == 5) || (i == 2))) {
            extenso = extenso + unidade[auxnumero];
          } else if ((auxnumero < 10) && ((i == 13) || (i == 10) || (i == 7) || (i == 4) || (i == 1))) {
            auxnumero3 = vlrS.substr(cont - i - 1, 1);
            if ((auxnumero3 != "1") && (auxnumero3 != ""))
              extenso = extenso + unidade[auxnumero];
          }

        if (i % 3 == 1) {
          verifica3 = cont - i;
          if (verifica3 == 0)
            verifica1 = vlrS.substr(cont - i, 1);

          if (verifica3 == 1)
            verifica1 = vlrS.substr(cont - i - 1, 2);

          if (verifica3 > 1)
            verifica1 = vlrS.substr(cont - i - 2, 3);

          verifica2 = parseInt(verifica1);

          if (i == 13) {
            if (verifica2 == 1) {
              extenso = extenso + " " + qualificaS[4] + " ";
            } else if (verifica2 != 0) { extenso = extenso + " " + qualificaP[4] + " "; }
          }
          if (i == 10) {
            if (verifica2 == 1) {
              extenso = extenso + " " + qualificaS[3] + " ";
            } else if (verifica2 != 0) { extenso = extenso + " " + qualificaP[3] + " "; }
          }
          if (i == 7) {
            if (verifica2 == 1) {
              extenso = extenso + " " + qualificaS[2] + " ";
            } else if (verifica2 != 0) { extenso = extenso + " " + qualificaP[2] + " "; }
          }
          if (i == 4) {
            if (verifica2 == 1) {
              extenso = extenso + " " + qualificaS[1] + " ";
            } else if (verifica2 != 0) { extenso = extenso + " " + qualificaP[1] + " "; }
          }
          if (i == 1) {
            if (verifica2 == 1) {
              extenso = extenso + " " + qualificaS[0] + " ";
            } else { extenso = extenso + " " + qualificaP[0] + " "; }
          }
        }
      }
      resto = resto * 100;
      var aexCent = 0;
      if (resto <= 19 && resto > 0)
        extenso += " e " + unidade[resto] + " Centavos";
      if (resto > 19) {
        aexCent = parseInt(resto / 10);

        extenso += " e " + dezena[aexCent]
        resto = resto - (aexCent * 10);

        if (resto != 0)
          extenso += " e " + unidade[resto] + " Centavos";
        else extenso += " Centavos";
      }

      return extenso;
    }
    else { return  "Numero maior que 999 trilhões"; }
  }
}

