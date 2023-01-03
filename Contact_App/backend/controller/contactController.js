import { ContactModel, contactValidation } from "../model/contactModel.js";

const getContact = async (req,res)=>{
    const contact = await ContactModel.find({ userId: req.user._id})
    res.send(contact)
}

const getOneContact = async (req,res)=>{
    console.log(req.params)
    console.log(req.user._id)
    const contact = await ContactModel.find({ userId: req.user._id , _id:req.params.contactId})
    res.send(contact)
}

const createContact =(req,res)=>{
    const { error } = contactValidation(req.body);
    if (error) return res.status(400).send({message:error.details[0].message});

    const {name, phone, email, place} = req.body;
    ContactModel.findOne({phone}, async (err, found)=>{
        if (!err) {
            if(found) res.status(403).send({message:"Contact already registered"});
            else{
                let contact = new ContactModel({
                    userId: req.user._id,
                    name,
                    phone,
                    email,
                    place,
                  });
                  contact = await contact.save();
                  res.status(200).send({success:"Contact Saved"});
            }
        }else res.status(502).send(err);
    })
}

const updateContact = async (req, res) => {
    const {_id, ...rest} = req.body 
    const { error } = contactValidation(rest);
    if (error) return res.send({message:error.details[0].message});
    let result = await ContactModel.findOneAndUpdate({_id, userId:req.user._id}, rest, {new: true});   
    res.send({result:[result]});
};

const deleteContact = (req, res) => {
    console.log(req.body)
    const {_id} = req.body; 
    ContactModel.findOneAndDelete({_id, userId:req.user._id},function (err) {
        if (err){
            res.send(err)
        }
        else{
            res.status(200).send({message:"Deleted Successfuly"})
        }
    });   
};


export {getContact, createContact, updateContact, deleteContact, getOneContact};