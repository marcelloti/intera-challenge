# intera-challenge
Desafio de processo seletivo para a empresa Intera

Este repositório contém 3 microserviços. São eles:

Talents - Serviço de cadastro de usuário

Openings - Serviço de cadastro de vagas

Match - Serviço de monitoramento de "Matches"

O repositório também contém o diretório "template", que serve
para expandir (criar) mais microserviços caso necessário.

## Eventos e Zeebe Workflow Engine
Os microserviços são orientados a eventos e orquestrados
pelo Zeebe Workflow Engine, que permite também acompanhar
o fluxo de requisições de forma gráfica. O código
de inicialização do Zeebe fica no serviço "Talents"

Para rodar o projeto, execute os seguintes passos:

1- Clone o repositório
   git clone https://github.com/marcelloti/intera-challenge
   cd intera-challenge

2- Crie os arquivos .env dos serviços de acordo com os arquivos .env.example.
   Para facilitar, os arquivos .env.example foram criados já preenchidos. A dica
   aqui fica por conta do arquivo .env do serviço "Match". Este serviço fica
   observando possíveis cadastros no serviço "Talents". Caso algum usuário
   seja cadastrado, o serviço "Match" envia um email. Este envio de email
   está sendo feita pelo serviço online "Ethereal". Este serviço permite
   manter uma caixa de mensagens virtual online. Para configurar este serviço
   simplesmente entre no endereço http://ethereal.email/ e clique em "Create Ethereal Account".
   Nenhum dado será requisitado a você ao clicar neste botão. Dados de acesso à caixa de
   email temporária serão exibidos em seguida na tela. Utilize esses dados para
   configurar corretamente seu arquivo .env

3- Em cada diretório de microserviços (exceto o diretório template) execute os seguintes comandos:
   npm install
   npm run build

4- Suba os containers de docker no serviço talents:
  cd talents/docker
  sudo mkdir -p zeebe/storage/elasticsearch_data; sudo chmod 777 -R zeebe/storage/
  docker-compose up -d

5- Faça o deploy do workflow
  npm run 

6- Suba os demais serviços
  cd ../../openings/docker/
  npm run start

  cd ../../match/docker/
  docker-compose up -d

7- Volte ao serviço de talents e entregue o workflow:
  npm run deployWorkflow

  Após rodar esse comando, você poderá abrir o "Zeebe Simple Monitor" 
  no endereço http://0.0.0.0:8082/ em seu navegador para acompanharos fluxos.
  Na aba "Workflows" será possível ver o registro do workflow que foi entregue
  com o nome de "talentRegister";

8- Hora de executar os endpoints. Foi disponibilizado no repositório um JSON
   do programa Insomnia, que facilitará a execução dos endpoints. Importe
   este JSON para o Insomnia e divirta-se! Dica: execute primeiro os endpoints
   de cadastro (de Talents e Openings).

Observações importantes
 - Os serviços foram testados com node versão 14.14.0, porém a configuração
do docker-compose em cada um deles não foi finalizada.
 - Não foi possível criar um processo automizado de CI/CD a tempo. As
   alterantivas seriam Terraform ou CircleCI.
 - Existe um endpoint em cada serviço "/docs" onde é possível verificar
   a documentação de cada microserviço
 - Você pode conhecer mais sobre o Zeebe neste artigo em meu Medium:
  https://medium.com/@marcelloti/orquestra%C3%A7%C3%A3o-de-micro-servi%C3%A7os-com-zeebe-workflow-engine-bpmn-e-node-usando-nestjs-94621892170c
