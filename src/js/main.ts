/*!
 * MQTT custom web control for WinCC Unififed
 *
 * @author   Stefan Preuß
 * @copyright Stefan Preuß 2024
 */
/*global WebCC */

import { Logging } from './log';
import { Mqtt, MqttOptions } from './mqttConnection';


const mqttOptions:MqttOptions = {
    broker: '',
    port: 9001
};

const log = new Logging(document.getElementById('table') as HTMLTableElement);
const mqtt = new Mqtt(log);

WebCC.start(
    async function (result:boolean) {

        if (result) {

            if (!WebCC.isDesignMode) {

                if (WebCC.Properties['Url']){

                    const url = WebCC.Properties['Url'] as string;
                    const urlParts = url.split(':');

                    if (urlParts.length == 1){
                        mqttOptions.broker = url;
                    }
                    else if (urlParts.length == 2) {
                        mqttOptions.broker = urlParts[0];
                        mqttOptions.port = Number(urlParts[1]);
                    }

                }

            }
        }
        else {

            log.enable = true;
            log.append('error', 'Connection to CWC failed! Logging enabled.');

            mqttOptions.broker = 'mqtt.smarthome';
            await mqtt.connect(mqttOptions);
            await mqtt.subscribe('test');
            await mqtt.publish('test', 'lsls');
            await mqtt.unsubscribe('test');
  
        }

        
        // Receive messages
        mqtt.client.on('message', function (topic, message) {
            const msg = {
                topic: topic,
                message: message.toString()
            };

            console.log(JSON.stringify(msg));
            WebCC.Events.fire('onMessage', JSON.stringify(msg));
        });
    },
    {
        // Methods of the CustomWebControl
        methods: {
            subscribe (topic:string){
                mqtt.subscribe(topic);
            },
            unsubscribe (topic:string){
                mqtt.unsubscribe(topic);
            },
            publish (topic:string, message: string){
                console.log('Publish:', message, 'to topic: ', topic);
            },

        },
        // Define events
        events: [
            'onMessage',
        ],
        // Define proberties
        properties: {
            Broker: ''
        }
    },
    // placeholder to include additional Unified dependencies
    [],
    // connection timeout
    10000
);

