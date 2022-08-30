const users = [];

//Joining chat
function joinUser(id,username) {
    const user = {id,username};
    users.push(user);
    return user;
} 

//when user leaves the chat ..
function leaveUser(id){
    const index = users.findIndex(user => user.id === id );
    if(index !== -1){
        return users.splice(index,1)[0];       //to just retunrning a single user just ..
    }
}

function checkUser(name){
    if( users.indexOf(name) === -1 )
        return true;
    return false;
}

module.exports = {
    join:joinUser,
    leave:leaveUser,
    check:checkUser
};