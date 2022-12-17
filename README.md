# TP1

## Membros do grupo

| Matrícula  | Aluno                       | GitHub                                                       |
| ---------- | --------------------------- | ------------------------------------------------------------ |
| 17/0144488 | Henrique Amorim Costa Melo  | [@HenriqueAmorim20](https://github.com/HenriqueAmorim20)     |
| 17/0122549 | Paulo Gonçalves Lima        | [@PauloGoncalvesLima](https://github.com/PauloGoncalvesLima) |
| 17/0113060 | Pedro Vítor de Salles Cella | [@pedro-cella](https://github.com/pedro-cella)               |

## Linguagem de Programação escolhida

JavaScript

## Como rodar

### Docker

Para poder rodar o projeto utilizando o docker apenas utilize o comando do make:

#### Docker compose v2

``make run``

#### Docker compose v1

``make run_v1``

##### OBS

O comando make run utiliza a [versão 2.0 do docker-compose](https://www.docker.com/blog/announcing-compose-v2-general-availability/).

### NPM

Para executar com npm basta rodar:<br>
``npm install`` <br>
e em seguida: <br>
``npm run test:cov``

## Enunciado do exercício

### Trabalho Prático 1 - Test-Driven Development

[Enunciado do trabalho](https://github.com/andrelanna/fga0242/tree/master/tp1)

Com base na descrição do cálculo do IRPF acima, o trabalho a ser realizado pelo grupo consiste na criação de um simulador similar ao simulador disponibilizado pela RFB. Esse simulador deverá ser construído através do método de TDD utilizando, obrigatoriamente, as técnicas de falsificação, duplicação e triangulação de testes.

O projeto resultante do desenvolvimento através de TDD deverá ser capaz de:

    Cadastro de rendimentos:
        Cadastrar rendimentos com a descrição (salario, aluguel, etc...) e valor
        Não permitir descrição em branco (nesse caso lançar uma exceção do tipo DescricaoEmBrancoException
        Não permitir informar valores de rendimentos em branco ou inválidos (negativos por exemplo). Nesses casos lançar exceção do tipo ValorRendimentoInvalidoException

    Cadastro de deduções:
        Cadastrar deduções através de sua descrição (Previdencia privada, Funpresp, etc...) e valor:
            Não permitir cadastro de deduções com descrição em branco. Nesse caso lançar DescricaoEmBrancoException.
            Não permitir cadastro de valores em branco ou inválidos para as deduções. Nesses casos lançar uma exceção do tipo ValorDeducaoInvalidoException
        Cadastrar uma ou mais contribuição previdenciária oficial, informando descrição e valores.
            As restrições apresentadas no caso acima se aplicam integralmente para contribuições previdenciárias.
        Cadastrar uma ou mais pensão alimentícia, informando valores.
            As restrições apresentadas no caso acima se aplicam integralmente para contribuições previdenciárias.
        Cadastrar dependentes (zero ou mais), informando o nome e a data de nascimento de cada dependente.
            Não permitir o cadastro de um dependente com o nome em branco. Nesse caso deverá lançar uma exceção do tipo NomeEmBrancoException.

    Calculo dos impostos das faixas de impostos:
        Calcular o valor de faixa de base de cálculo de cada uma das faixas e o valor do imposto para cada uma das faixas.
        Calcular o valor total das faixas de base de cálculo e o valor total do imposto de todas as faixas.

    Calcular a alíquota efetiva.

O trabalho deverá apresentar o emprego das três técnicas de TDD (falsificação, duplicação e triangulação) em, pelo menos, nas três seguintes situações:

    Calculo do total de deduções;
    Cálculos da base de calculo e do valor de imposto da faixa 1;
    Cálculo da aliquota efetiva.

Nesses três casos deverá, para efeito de evidência, ter a seguinte sequencia de commits:

    falsificação;
    duplicação;
    triangulação.
