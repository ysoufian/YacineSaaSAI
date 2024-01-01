import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';



var reactPlugin = new ReactPlugin();
var appInsights = new ApplicationInsights({
    config: {
        connectionString: "InstrumentationKey=fb63e2e5-a5d1-444a-89bc-c8e116ea3695;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/"
        ,
        enableAutoRouteTracking: true,
        extensions: [reactPlugin]
    }
});
appInsights.loadAppInsights();


export { reactPlugin, appInsights }