import Meta from './meta';
import hostdata from "./hostdata.json";

const landOwnerData = {
  host_data: JSON.stringify(hostdata)
};

let meta;
try{
  meta = new Meta(mzAPI, landOwnerData)
}catch(err){
  meta = new Meta({getUserData, getCurrentRealm}, landOwnerData)
}
engine.addSystem(meta);