import mqtt from 'mqtt';
import { Logging } from './log';

const timeout = 30000;

export class Mqtt {

    private log:Logging;
    public client!: mqtt.MqttClient;

    constructor (logInstance:Logging){
        this.log = logInstance;
    }

    public async connect(options:MqttOptions) : Promise<void>{

        return new Promise<void>((resolve, reject) => {

            const connectionCheck = setTimeout(() => {
                this.log.append('error', `Couldn't connect to host: ${options.broker} in ${timeout} seconds!`);
                reject(`Couldn't connect to host: ${options.broker} in ${timeout} seconds!`);
            }, timeout);

            const mqttOptions: mqtt.IClientOptions = {
                rejectUnauthorized: false
            };

            if (options.user) mqttOptions.username = options.user;
            if (options.password) mqttOptions.password = options.password;

            mqtt.connectAsync(`${options.broker}`, mqttOptions)
                .then(a => {

                    clearTimeout(connectionCheck);

                    this.client = a;
                    this.log.append('info', `Connected to broker: ${this.client.options.protocol}://${this.client.options.host}`);
                    resolve();
                })
                .catch(e =>{
                    clearTimeout(connectionCheck);
                    this.log.append('error', e);
                    reject(e);
                });
        });
    }

    public async subscribe(topic:string){

        return new Promise<void>((resolve, reject) => {

            if (!this.client.connected){
                this.log.append('error', "Client not connected");
                reject("Client not connected");
            } 

            this.client.subscribeAsync(topic)
                .then(() => {
                    this.log.append('info', `Subscribed to topic: ${topic}`);
                    resolve();
                })
                .catch(e =>{
                    this.log.append('error', e);
                    reject(e);
                });
        });
    }

    public async unsubscribe(topic:string){

        return new Promise<void>((resolve, reject) => {

            if (!this.client.connected){
                this.log.append('error', "Client not connected");
                reject("Client not connected");
            } 

            this.client.unsubscribeAsync(topic)
                .then(() => {
                    this.log.append('info', `Unsubscribed from topic: ${topic}`);
                    resolve();
                })
                .catch(e =>{
                    this.log.append('error', e);
                    reject(e);
                });
        });
    }

    public async publish(topic:string, msg:string){

        return new Promise<void>((resolve, reject) => {

            if (!this.client.connected){
                this.log.append('error', "Client not connected");
                reject("Client not connected");
            } 

            this.client.publishAsync(topic, msg)
                .then(() => {
                    this.log.append('info', `Published '${msg}' to topic: ${topic}`);
                    resolve();
                })
                .catch(e =>{
                    this.log.append('error', e);
                    reject(e);
                });
        });
    }
}



export interface MqttOptions {
    broker: string,
    user?: string,
    password?: string
}