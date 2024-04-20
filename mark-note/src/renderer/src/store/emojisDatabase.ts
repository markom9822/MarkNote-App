
const emojiList = [
  {id: 0, name: 'smile', emoji: '😄'}, 
  {id: 1, name: 'laughing', emoji: '😆'},
  {id: 2, name: 'blush', emoji: '😊'},
  {id: 3, name: 'smiley', emoji: '😃'},
  {id: 4, name: 'smirk', emoji: '😏'},
  {id: 5, name: 'heart_eyes', emoji: '😍'},
  {id: 6, name: 'kissing_heart', emoji: '😘'},
  {id: 7, name: 'kissing_closed_eyes', emoji: '😚'},
  {id: 8, name: 'flushed', emoji: '😳'},
  {id: 9, name: 'relieved', emoji: '😌'},
  {id: 10, name: 'grin', emoji: '😁'},
  {id: 11, name: 'wink',emoji: '😉'},
  {id: 12, name: 'stuck_out_tongue', emoji: '😛'},
  {id: 13, name: 'sleeping', emoji: '😴'},
  {id: 14, name: 'worried', emoji: '😟'},
  {id: 15, name: 'open_mouth', emoji: '😮'},
  {id: 16, name: 'confused', emoji: '😕'},
  {id: 17, name: 'expressionless', emoji: '😑'},
  {id: 18, name: 'sweat_smile', emoji: '😅'},
  {id: 19, name: 'weary', emoji: '😩'},
  {id: 20, name: 'pensive', emoji: '😔'},
  {id: 21, name: 'disappointed', emoji: '😞'},
  {id: 22, name: 'fearful', emoji: '😨'},
  {id: 23, name: 'cry', emoji: '😢'},
  {id: 24, name: 'sob',emoji: '😭'},
  {id: 25, name: 'joy',emoji: '😂'},
  {id: 26, name: 'scream',emoji: '😱'},
  {id: 27, name: 'angry',emoji: '😠'},
  {id: 28, name: 'rage',emoji: '😡'},
  {id: 29, name: 'triumph',emoji: '😤'},
  {id: 30, name: 'sleepy',emoji: '😪'},
  {id: 31, name: 'yum',emoji: '😋'},
  {id: 32, name: 'mask',emoji: '😷'},
  {id: 33, name: 'sunglasses',emoji: '😎'},
  {id: 34, name: 'dizzy_face',emoji: '😵'},
  {id: 35, name: 'innocent',emoji: '😇'},
  {id: 36, name: 'alien',emoji: '👽'},
  {id: 37, name: 'fire',emoji: '🔥'},
  {id: 38, name: 'poop',emoji: '💩'},
  {id: 39, name: '+1',emoji: '👍'},
  {id: 40, name: 'thumbsup',emoji: '👍'},
  {id: 41, name: '-1',emoji: '👎'},
  {id: 42, name: 'thumbsdown',emoji: '👎'},
  {id: 43, name: 'ok_hand',emoji: '👌'},
  {id: 44, name: 'wave',emoji: '👋'},

];

export const getEmojiFromText = (text: string) => {

    const match = emojiList.find((item) => item.name === text)
    if(match !== undefined)
    {
        return match.emoji
    }
    else
    {
        return ''
    }
}