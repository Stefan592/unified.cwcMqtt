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
    
            mqtt.connectAsync(`ws://${options.broker}:${options.port}`)
                .then(a => {
                    this.client = a;
                    this.log.append('info', `Connected to broker: ${this.client.options.protocol}://${this.client.options.host}`);
                    resolve();
                })
                .catch(e =>{
                    console.log(e);
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