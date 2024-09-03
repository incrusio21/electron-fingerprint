// import axios, { AxiosResponse } from 'axios';
// import { parseStringPromise } from 'xml2js';

// export class FingerprintSOAP {
//     private hostname: string;
//     private apiKey: string;
//     private apiSecret: string;
//     private url: string = "";
//     private port: number = 80;
//     private comKey: string = "0";
//     private machineNo: string = "";
//     private timeout: number = 0;
//     private headers: Record<string, string> = { 'Content-Type': 'text/xml' };

//     constructor(hostname: string = "", apiKey: string = "", apiSecret: string = "") {
//         this.hostname = hostname;
//         this.apiKey = apiKey;
//         this.apiSecret = apiSecret;
//     }

//     setDevice(ip: string = "192.168.1.210", port: number = 80, comKey: string = "0", machineNo: string = "0"): void {
//         this.url = `http://${ip}/iWsService`;
//         this.port = port;
//         this.comKey = comKey;
//         this.machineNo = machineNo;
//         this.timeout = 1000; // milidetik
//     }

//     getHeaders(): Record<string, string> {
//         return {
//             'Authorization': `token ${this.apiKey}:${this.apiSecret}`,
//             'Content-Type': 'application/json',
//         };
//     }    

//     requestMsg(request: AxiosResponse<any> | undefined, msg: string = ""): boolean {
//         if (!request || !request.data) {
//           console.warn(msg);
//           return false;
//         }
    
//         return true;
//     }

//     async requestSoap(body: string, errorRaise: boolean = false, timeout: number = this.timeout): Promise<AxiosResponse<any> | undefined> {
//         try {
//           const response = await axios.post(this.url, body, { headers: this.headers, timeout });
//           return response;
//         } catch (error) {
//           if (axios.isAxiosError(error)) {
//             if (error.code === 'ECONNABORTED' && errorRaise) {
//               console.warn("Connection Error: Can't Connect to Fingerprint");
//             } else {
//               console.warn(`Request Error: ${error.message}`);
//             }
//           }
//           return undefined;
//         }
//     }

//     async insertToFingerprintLog(data: Record<string, any>): Promise<void> {
//         try {
//           const response = await axios.post(
//             `${this.hostname}/api/resource/Fingerprint Log`,
//             { data: { ...data, "machine_no": this.machineNo } },
//             { headers: this.getHeaders() }
//           );
    
//           if (response.status !== 200) {
//             console.error(`Error: ${response.status}`);
//           }
//         } catch (error) {
//           console.error(`Error: ${error}`);
//         }
//     }

//     async getLogData(fromDate?: Date, toDate?: Date): Promise<boolean | undefined> {
//         if (!this.getMachineTerminalTime()) {
//             return;
//         }

//         const lastSyncTimeResponse = await axios.get(
//             `${this.hostname}/api/method/soap_fingerprint.v1.log_data.get_last_sync_time`,
//             { headers: this.getHeaders(), data: { machine_no: this.machineNo } }
//         );
    
//         toDate = toDate || new Date();

//         let dateTime: string = "";
//         const lstDict = lastSyncTimeResponse.data;

//         if (lstDict?.message) {
//             dateTime = lstDict.message.join(" ");
//         }

//         fromDate = fromDate || new Date(dateTime);

//         const body = `<GetAttLog><ArgComKey xsi:type="xsd:integer">${this.comKey}</ArgComKey><Arg><PIN xsi:type="xsd:integer">All</PIN></Arg></GetAttLog>`;
//         const request = await this.requestSoap(body);

//         if (!this.requestMsg(request, "Data Log Fingerprint Empty")) {
//             return;
//         }

//         const logList: Record<string, any>[] = [];
//         const parsedData = await parseStringPromise(request?.data);
//         const rows = parsedData?.Row;

//         for (const row of rows) {
//             const dateTime = row.DateTime[0];
//             if (!onDatetimeRange(dateTime, [fromDate, toDate])) continue;

//             if (getDatetime(dateTime) > toDate) break;

//             logList.push({
//                 pin: row.PIN[0],
//                 date_time: dateTime,
//                 verified: row.Verified[0],
//                 status: row.Status[0],
//                 workcode: row.WorkCode[0]
//             });
//         }

//         const totalLogList = logList.length;
//         for (let x = 0; x < totalLogList; x += 100) {
//             const endIndex = Math.min(x + 100, totalLogList);

//             const lastDataDatetime = logList[endIndex - 1]["date_time"];
//             await this.insertToFingerprintLog({
//                 "type": "Import Data Log",
//                 "datetime": lastDataDatetime,
//                 "data": JSON.stringify({ data: logList.slice(x, endIndex) })
//             });
//         }

//         return true;
//     }

//     async getMachineTerminalTime(raiseError: boolean = false): Promise<Record<string, string> | undefined> {
//         const body = `<GetDate><ArgComKey xsi:type="xsd:integer">${this.comKey}</ArgComKey></GetDate>`;
//         const request = await this.requestSoap(body, raiseError, 1000);
    
//         if (!this.requestMsg(request, "Fingerprint not send anything")) {
//           return;
//         }
    
//         const parsedData = await parseStringPromise(request?.data);
//         const datetime: Record<string, string> = {
//           date: parsedData?.Row[0]?.Date[0] || '',
//           time: parsedData?.Row[0]?.Time[0] || '',
//         };
    
//         return datetime;
//     }
// }

// // Fungsi tambahan untuk membantu dengan logika tanggal dan waktu
// function getDatetime(dateTime: string | Date | null): Date {
//     // Implementasi fungsi getDatetime
//     return new Date(dateTime || Date.now());
// }
  
// function onDatetimeRange(dateTime: string, range: [Date, Date]): boolean {
// // Implementasi fungsi untuk memeriksa apakah dateTime ada dalam jangkauan
//     return true;
// }