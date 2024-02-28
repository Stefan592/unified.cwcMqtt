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
                    else {
                        log.append('error', `Url do not match with the requirements. URL: ${url}`);
                    }

                    await mqtt.connect(mqttOptions);

                }

            }
        }
        else {

            log.append('error', 'Connection to CWC failed! Logging enabled.');

            mqttOptions.broker = 'mqtt.smarthome';
            await mqtt.connect(mqttOptions);
            await mqtt.subscribe('test');
            await mqtt.publish('test', 'lsls');
  
        }

        
        // Receive messages
        mqtt.client.on('message', function (topic, message) {
            const msg = {
                topic: topic,
                message: message.toString()
            };

            log.append('info', `New message from topic: ${topic}. Message: ${message}`);
            WebCC.Events.fire('onMessage', JSON.stringify(msg));
        });
    },
    {
        // Methods of the CustomWebControl
        methods: {
            async subscribe (topic:string){
                await mqtt.subscribe(topic);
            },
            async unsubscribe (topic:string){
                await mqtt.unsubscribe(topic);
            },
            async publish (topic:string, message: string){
                await mqtt.publish(topic, message);
            },

        },
        // Define events
        events: [
            'onMessage',
        ],
        // Define proberties
        properties: {
            Url: '',
            Debug: true
        }
    },
    // placeholder to include additional Unified dependencies
    [],
    // connection timeout
    10000
);

