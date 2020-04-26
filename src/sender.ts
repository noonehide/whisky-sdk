interface Iqueue {
  type: string,
  data: any
}

class Sender {

  static queue: Array<Iqueue>;

  static push(type: string, data: any) {
    console.log(`sendMesage type=${type}  data=${JSON.stringify(data)}`)
    Sender.queue.push({
      type,
      data
    })
  }
}
export default Sender
