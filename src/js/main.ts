/*!
 * MQTT custom web control for WinCC Unififed
 *
 * @author   Stefan Preuß
 */
/*global WebCC */

import { Logging } from './log';
import { Mqtt, MqttOptions } from './mqttConnection';


const mqttOptions:MqttOptions = {
    broker: ''
};

const log = new Logging(document.getElementById('table') as HTMLTableElement);
const mqtt = new Mqtt(log);

WebCC.start(
    async function (result:boolean) {

        if (result) {

            if (!WebCC.isDesignMode) {

                if (WebCC.Properties['Debug']){
                    log.enable = WebCC.Properties['Debug'] as boolean;
                }

                if (WebCC.Properties['Username']){
                    mqttOptions.user = WebCC.Properties['Username'] as string;
                }
                
                if (WebCC.Properties['Password']){
                    mqttOptions.password = WebCC.Properties['Password'] as string;
                }

                if (WebCC.Properties['Url']){
                    mqttOptions.broker = WebCC.Properties['Url'] as string;
                    await mqtt.connect(mqttOptions);               
                }

            }
        }
        else{
            log.append('error', 'Connection to CWC failed! Logging enabled.');
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
            Debug: false,
            Username: '',
            Password: ''
        }
    },
    // placeholder to include additional Unified dependencies
    [],
    // connection timeout
    10000
);


