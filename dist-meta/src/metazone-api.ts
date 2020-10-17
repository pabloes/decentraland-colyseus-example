export class MetaZoneAPI  {

    server = {
      realm: ''
    }
    user = {
      name: 'Guest'+Math.floor(Math.random() * 1000000),
      email: '',
      eth_address: '',
      data: null
    }
    parcel = {
      plot_owner: '',
      plot_x: 0,
      plot_y: 0,
      plot_contact: '',
      plot_email: '',
      plot_count: 0
    }
  
    eth = null
    getProvider = null
    EthConnect = null
  
    /**
     * Stores initial user and parcel info to send to the backend on every request.
     *
     * @param callback        Callback after all async calls completed
     */
    constructor(getProvider, getUserData, getCurrentRealm, EthereumController, EthConnect, dcl, callback) {
  
      this.eth = EthereumController
      this.EthConnect = EthConnect
      this.getProvider = getProvider
  
      executeTask(async () => {
        // Get ETH public address
        try {
          this.user.eth_address = await this.eth.getUserAccount()
          log('ETH address: ',this.user.eth_address)
        } catch (error) {
          log('ETH address: ',error.toString())
        }
  
        // Get player passport username
        const data = await getUserData()
        log('User Data: ',data)
        if(data) {
          this.user.data = data
          this.user.name = data.displayName ? data.displayName : this.user.name
        }
  
        // Get realm node
        const currentRealm = await getCurrentRealm()
        log('Realm: ',currentRealm)
        if(currentRealm) {
          this.server.realm = currentRealm.displayName
        }
  
  
        // Retrieve Parcel Data
        dcl.loadModule('ParcelIdentity').then(() => {
          dcl.callRpc('ParcelIdentity', 'getParcel', []).then((data) => {
            log('Parcel',data)
  
            // Store scene data
            let sceneBase = data.land.sceneJsonData ? data.land.sceneJsonData.scene.base : data.land.scene.scene.base
            let sceenBaseAxis = sceneBase.split(',')
            this.parcel.plot_x = sceenBaseAxis[0]
            this.parcel.plot_y = sceenBaseAxis[1]
            this.parcel.plot_owner = data.land.sceneJsonData ? data.land.sceneJsonData.owner : data.land.scene.owner
            this.parcel.plot_contact = data.land.sceneJsonData ? data.land.sceneJsonData.contact.name : data.land.scene.contact.name
            this.parcel.plot_email = data.land.sceneJsonData ? data.land.sceneJsonData.contact.email : data.land.scene.contact.email
            this.parcel.plot_count = data.land.sceneJsonData ? data.land.sceneJsonData.scene.parcels.length : data.land.scene.parcels.length
  
            callback()
          })
        })
      })
    }
  
  }