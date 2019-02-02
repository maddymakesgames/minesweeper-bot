module.exports = async (size, b, message, client) => {
    const game = [];
    for(let y = 0; y < size[1]; y++) {
        game[y] = [];
        for(let x = 0; x < size[0]; x++) {
            game[y][x] = 0;
        }
    }
    let bombs = [];
    for(let i = 0; i < b; i++) {
        bx = Math.floor(Math.random()*size[0]);
        by = Math.floor(Math.random()*size[1]);
        if(!bombs.includes([by,bx])) {
            game[by][bx] = 'bomb'
            bombs.push([bx,by]);
        }
        else i--;
    }

    for(let y = 0; y < game.length; y++) {
        for(let x = 0; x < game[y].length; x++) {
            for(let b = 0; b < bombs.length; b++) {
                d = Math.floor(Math.abs(Math.sqrt((x-bombs[b][0])**2+(y-bombs[b][1])**2)));
                if(d == 1 && game[y][x] != 'bomb') game[y][x]++;
            }
        }
    }
    let out = [];
    for(let y = 0; y < game.length; y++) {
        out[y] = `||${game[y].join('||||')}||`;
    }
    let output = out.join('\n');
    output += `\nbombx${b}`
    output = output.replace(/1/g, ':one:').replace(/2/g, ':two:').replace(/3/g, ':three:').replace(/0/g, ':white_large_square:').replace(/4/g, ':four:').replace(/5/g, ':five:').replace(/6/g, ':six:').replace(/7/g, ':seven:').replace(/8/g, ':eight:').replace(/bomb/g, ':boom:');
    if(output.length > 2000) return message.channel.send('Board too big');
    message.channel.send(output);
}