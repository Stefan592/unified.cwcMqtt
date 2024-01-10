
export class Logging {

    private table:HTMLTableElement;

    public enable = false;
    public maxRows = 30;

    constructor (tableElement:HTMLTableElement) {
        this.table = tableElement;
    }


    /**
     * append
    test: 'info' | 'warning' | 'error', msg:string     */
    public append(level: 'info' | 'warning' | 'error', msg: string) {

        if (!this.enable) return;

        const template = `
            <tr class="${level}">
                <td>
                    <p>${msg}</p>
                </td>
            </tr>`;
        
        this.table.insertAdjacentHTML('beforeend', template);

        while (this.table.children.length > this.maxRows) {
            if (this.table.children[1]) this.table.removeChild(this.table.children[1]);
        }
    }
}
