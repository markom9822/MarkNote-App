
const emojiList = [
  {type: 'people', name: 'smile', emoji: '😄'}, 
  {type: 'people', name: 'laughing', emoji: '😆'},
  {type: 'people', name: 'blush', emoji: '😊'},
  {type: 'people', name: 'smiley', emoji: '😃'},
  {type: 'people', name: 'smirk', emoji: '😏'},
  {type: 'people', name: 'heart_eyes', emoji: '😍'},
  {type: 'people', name: 'kissing_heart', emoji: '😘'},
  {type: 'people', name: 'kissing_closed_eyes', emoji: '😚'},
  {type: 'people', name: 'flushed', emoji: '😳'},
  {type: 'people', name: 'relieved', emoji: '😌'},
  {type: 'people', name: 'grin', emoji: '😁'},
  {type: 'people', name: 'wink',emoji: '😉'},
  {type: 'people', name: 'stuck_out_tongue', emoji: '😛'},
  {type: 'people', name: 'sleeping', emoji: '😴'},
  {type: 'people', name: 'worried', emoji: '😟'},
  {type: 'people', name: 'open_mouth', emoji: '😮'},
  {type: 'people', name: 'confused', emoji: '😕'},
  {type: 'people', name: 'expressionless', emoji: '😑'},
  {type: 'people', name: 'sweat_smile', emoji: '😅'},
  {type: 'people', name: 'weary', emoji: '😩'},
  {type: 'people', name: 'pensive', emoji: '😔'},
  {type: 'people', name: 'disappointed', emoji: '😞'},
  {type: 'people', name: 'fearful', emoji: '😨'},
  {type: 'people', name: 'cry', emoji: '😢'},
  {type: 'people', name: 'sob',emoji: '😭'},
  {type: 'people', name: 'joy',emoji: '😂'},
  {type: 'people', name: 'scream',emoji: '😱'},
  {type: 'people', name: 'angry',emoji: '😠'},
  {type: 'people', name: 'rage',emoji: '😡'},
  {type: 'people', name: 'triumph',emoji: '😤'},
  {type: 'people', name: 'sleepy',emoji: '😪'},
  {type: 'people', name: 'yum',emoji: '😋'},
  {type: 'people', name: 'mask',emoji: '😷'},
  {type: 'people', name: 'sunglasses',emoji: '😎'},
  {type: 'people', name: 'dizzy_face',emoji: '😵'},
  {type: 'people', name: 'innocent',emoji: '😇'},
  {type: 'people', name: 'alien',emoji: '👽'},

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
        return text
    }
}

export const getEmojiList = () => {
    return(emojiList)
}
