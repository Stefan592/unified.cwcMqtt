# unified.cwcMqtt

## Importand


## Installation
1. Build CustomWebControl
    - Use builded CWC artifact from Github Actions
    - Build local
        - npm install
        - npm run createRelease
        - You can find the builded CWC in 'release' folder 

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
        - Url - Format 'Broker:Port[9001]' 
        - Debug - If your are intereseted on debug messages




## Methods
### subscribe
Subscribes to an MQTT topic
If message arrives, the ['onMessage'](#onMessage) event will be fired.

topic: 
- topic:string

### unsubscribe
Unubscribes to an MQTT topic

topic: 
- topic:string

### publish
Publish a message to an topic.

Arguments: 
- topic:string
- message:string




## Events
### onMessage
If an subscribed message arrives, event will fired.

topic: 
    - data:string
        - stringified object {topic: string, message:string}

