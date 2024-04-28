
const emojiList = [
  {name: 'smile', emoji: '😄'}, 
  {name: 'laughing', emoji: '😆'},
  {name: 'blush', emoji: '😊'},
  {name: 'smiley', emoji: '😃'},
  {name: 'smirk', emoji: '😏'},
  {name: 'heart_eyes', emoji: '😍'},
  {name: 'kissing_heart', emoji: '😘'},
  {name: 'kissing_closed_eyes', emoji: '😚'},
  {name: 'flushed', emoji: '😳'},
  {name: 'relieved', emoji: '😌'},
  {name: 'grin', emoji: '😁'},
  {name: 'wink',emoji: '😉'},
  {name: 'stuck_out_tongue', emoji: '😛'},
  {name: 'sleeping', emoji: '😴'},
  {name: 'worried', emoji: '😟'},
  {name: 'open_mouth', emoji: '😮'},
  {name: 'confused', emoji: '😕'},
  {name: 'expressionless', emoji: '😑'},
  {name: 'sweat_smile', emoji: '😅'},
  {name: 'weary', emoji: '😩'},
  {name: 'pensive', emoji: '😔'},
  {name: 'disappointed', emoji: '😞'},
  {name: 'fearful', emoji: '😨'},
  {name: 'cry', emoji: '😢'},
  {name: 'sob',emoji: '😭'},
  {name: 'joy',emoji: '😂'},
  {name: 'scream',emoji: '😱'},
  {name: 'angry',emoji: '😠'},
  {name: 'rage',emoji: '😡'},
  {name: 'triumph',emoji: '😤'},
  {name: 'sleepy',emoji: '😪'},
  {name: 'yum',emoji: '😋'},
  {name: 'mask',emoji: '😷'},
  {name: 'sunglasses',emoji: '😎'},
  {name: 'dizzy_face',emoji: '😵'},
  {name: 'innocent',emoji: '😇'},
  {name: 'alien',emoji: '👽'},

  {name: 'fire',emoji: '🔥'},
  {name: 'poop',emoji: '💩'},
  {name: 'yellow_heart',emoji: '💛'},
  {name: 'blue_heart',emoji: '💙'},
  {name: 'purple_heart',emoji: '💜'},
  {name: 'heart',emoji: '❤️'},
  {name: 'green_heart',emoji: '💚'},
  {name: 'broken_heart',emoji: '💔'},
  {name: 'heartbeat',emoji: '💓'},
  {name: 'heartpulse',emoji: '💗'},
  {name: 'two_hearts',emoji: '💕'},
  {name: 'cupid',emoji: '💘'},
  {name: 'sparkling_heart',emoji: '💖'},
  {name: 'sparkles',emoji: '✨'},
  {name: 'star',emoji: '⭐'},
  {name: 'star2',emoji: '🌟'},
  {name: 'dizzy',emoji: '💫'},
  {name: 'boom',emoji: '💥'},
  {name: 'anger',emoji: '💢'},
  {name: 'exclamation',emoji: '❗'},
  {name: 'question',emoji: '❓'},
  {name: 'grey_exclamation',emoji: '❕'},
  {name: 'grey_question',emoji: '❔'},
  {name: 'zzz',emoji: '💤'},
  {name: 'dash',emoji: '💨'},
  {name: 'sweat_drops',emoji: '💦'},
  {name: 'notes',emoji: '🎶'},
  {name: 'musical_note',emoji: '🎵'},

  {name: '+1',emoji: '👍'},
  {name: 'thumbsup',emoji: '👍'},
  {name: '-1',emoji: '👎'},
  {name: 'thumbsdown',emoji: '👎'},
  {name: 'ok_hand',emoji: '👌'},
  {name: 'wave',emoji: '👋'},
  {name: 'punch',emoji: '👊'},
  {name: 'v',emoji: '✌️'},
  {name: 'open_hands',emoji: '👐'},
  {name: 'point_up',emoji: '☝️'},
  {name: 'point_down',emoji: '👇'},
  {name: 'raised_hands',emoji: '🙌'},
  {name: 'pray',emoji: '🙏'},
  {name: 'clap',emoji: '👏'},
  {name: 'muscle',emoji: '💪'},
  {name: 'metal',emoji: '🤘'},
  {name: 'fu',emoji: '🖕'},

  {name: 'walking',emoji: '🚶'},
  {name: 'runner',emoji: '🏃'},
  {name: 'couple',emoji: '👫'},
  {name: 'family',emoji: '👪'},
  {name: 'dancer',emoji: '💃'},
  {name: 'dancers',emoji: '👯'},
  {name: '',emoji: ''},
  {name: '',emoji: ''},

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

export const filterEmojiByName = (name: string) => {

}