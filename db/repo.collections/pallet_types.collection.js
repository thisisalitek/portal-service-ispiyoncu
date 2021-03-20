module.exports=function(dbModel){
    let schema = mongoose.Schema({
        name: {type: String, trim:true, required: [true,'isim/kod gereklidir.'] , unique:true},
        description: {type: String, trim:true, default:''},
        width: {type: Number, default: 0, index:true}, //birim mm/MMT
        length: {type: Number, default: 0, index:true}, //birim  mm/MMT
        height: {type: Number, default: 0, index:true},//birim  mm/MMT
        weight:{type: Number, default: 0, index:true},//birim gr/GRM
        maxWeight:{type: Number, default: 0, index:true},//birim kg/KGM
        createdDate: { type: Date,default: Date.now, index:true},
        modifiedDate:{ type: Date,default: Date.now},
        passive: {type: Boolean, default: false, index:true}
    })

    schema.pre('save', function(next) {
        next()
        //bir seyler ters giderse 
        // next(new Error('ters giden birseyler var'))
    })
    schema.pre('remove', function(next) {
        next()
    })

    schema.pre('remove', true, function(next, done) {
        next()
        //bir seyler ters giderse 
        // next(new Error('ters giden birseyler var'))
    })

    schema.on('init', function(model) {

    })
    schema.plugin(mongoosePaginate)
 

    let collectionName='pallet_types'
    let model=dbModel.conn.model(collectionName, schema)
    
    model.removeOne=(member, filter,cb)=>{ sendToTrash(dbModel.conn,collectionName,member,filter,cb) }
    // model.removeMany=(member, filter,cb)=>{ sendToTrashMany(conn,collectionName,member,filter,cb) }
    model.relations={pallets:'palletType'}
    // model.relations={machines:'location'}
    return model
}
