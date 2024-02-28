import mqtt from 'mqtt';
import { Logging } from './log';

export class Mqtt {


    private log:Logging;

    public client: mqtt.MqttClient;

    constructor (logInstance:Logging){
        this.log = logInstance;
        this.client = mqtt.connect('ws://127.0.0.1:9001', {manualConnect: true});
    }



    public async connect(options:MqttOptions) : Promise<void>{

        return new Promise<void>((resolve) => {

            const connectionCheck = setTimeout(() => {
                this.log.append('error', `Couldn't connect to host: ${this.client.options.host} in ${this.client.options.connectTimeout} seconds!`);
            }, this.client.options.connectTimeout);

            mqtt.connectAsync(`ws://${options.broker}:${options.port}`)
                .then(a => {

                    clearTimeout(connectionCheck);

                    this.client = a;
                    this.log.append('info', `Connected to broker: ${this.client.options.protocol}://${this.client.options.host}`);
                    resolve();
                })
                .catch(e =>{
                    this.log.append('error', e);
                });
        });
    }

    public async subscribe(topic:string){

        return new Promise<void>((resolve) => {
            this.client.subscribeAsync(topic)
                .then(() => {
                    this.log.append('info', `Subscribed to topic: ${topic}`);
                    resolve();
                });
        });
    }

    public async unsubscribe(topic:string){

        return new Promise<void>((resolve) => {
            this.client.unsubscribeAsync(topic)
                .then(() => {
                    this.log.append('info', `Unsubscribed from topic: ${topic}`);
                    resolve();
                });
        });
    }

    public async publish(topic:string, msg:string){

        return new Promise<void>((resolve) => {
            this.client.publishAsync(topic, msg)
                .then(() => {
                    this.log.append('info', `Published '${msg}' to topic: ${topic}`);
                    resolve();
                });
        });
    }
}



export interface MqttOptions {
    broker: string,
    port: number   
}