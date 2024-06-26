# unified.cwcMqtt

## Important

MQTT in browser is only possible over websocket protocol and not over mqtt protocol itself.
Ensure that your broker listen on websockets.



### SSL/TLS encryption
The custom web controls supports an encrypted connection. Your browser must accept the certificate.
If your access you WinCC Unified runtime over HTTPS you must use the secure websocket protocol. Browsers doesn't allow an unencrypted connection over the HTTPS protocol.


## Installation
1. Build CustomWebControl
    - Use CWC artifact from Github Actions
    - Build local
        - npm install
        - npm run createRelease
        - You can find the CWC archive in 'release' folder 

2. Attach CWC to TIA Portal
    - Global scope
        - copy CWC archive into "C:\Program Files\Siemens\Automation\Portal V19\Data\Hmi\CustomControls" (This is the default installation path. Can be different on your environment.)

    - Project scope
        - copy CWC into "PROJECTPATH/UserFiles/CustomControls"

3. Update TIA Portal
    - Start TIA Portal
    - Open project
    - Open screen
    - Click refresh button in section "My Controls" in the Toolbox

4. Configure CWC in TIA Portal
    - Place CWC on screen
    - Set properties
        - Url - Format 'protocol://broker:port' (wss://127.0.0.1:9001)
        - Debug - If your are interested  on debug messages
        - Username - Username for authentication (optional)
        - Password - Password for authentication (optional)




## Methods
### subscribe
Subscribes to an MQTT topic
If message arrives, the ['onMessage'](#onMessage) event will be fired.

topic: 
- topic:string

### unsubscribe
Unsubscribes from an MQTT topic

topic: 
- topic:string

### publish
Publish a message to an topic.

Arguments: 
- topic:string
- message:string


## Events
### onMessage
If a subscribed message arrives, event will fired.

topic: 
    - data:string
        - stringified object {topic: string, message:string}

