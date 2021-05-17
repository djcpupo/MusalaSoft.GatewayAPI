# MusalaSoft.GatewayAPI
Backend: MusalaSoft.GatewayAPI a .Net WebAPI application with a MSSQL Server database.
Frontend: MusalaSoft.GatewayWEB a React.js application with Material UI.

#Publish API
1- Clone this repo
2- Go to MusalaSoft.GatewayAPI root folder
3- Change ConnectionString value in Web.config file and point to your MSSQL Server and provide the correct autentication data
4- Open a windows Command Prompt in that folder and excecute** the command:
   > "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Current\Bin\msbuild.exe" /p:PublishUrl="..\PublishOutput" /p:DeployOnBuild=true /p:Configuration=Release /p:WebPublishMethod=FileSystem /p:DeployTarget=WebPublish /p:AutoParameterizationWebConfigConnectionStrings=false /p:SolutionDir="."
   > 
5- After the process is completed go to MusalaSoft.GatewayAPI folder and copy the "PublishOutput" folder content to your IIS site.
6- Verify if you can access to your ISS and visit %YourSiteUrl%/api/PeripheralStatus 
7- At this point you should see a List of status in your browser or Rest Client
** Verify if the msbuild.exe is in the provided route.

Excecute SPA
1- Move to MusalaSoft.GatewayAPI\MusalaSoft.GatewayWEB
2- Edit the ".env" file and update the REACT_APP_API_URL variable with your current API URL
3- Open a windows Command Prompt in that folder and excecute the command:
   > yarn start
   > 
4- After that a new tab or windows should be open in your browser in http://localhost:3000/ (If no tab or windows raise up then copy this URL in your browser)

   
