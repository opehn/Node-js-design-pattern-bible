const MODIFIER_NAMES = ['swap', 'write', 'fill']

export class ImmutableBuffer {
    constructor (size, executor) {
        const buffer = Buffer.alloc(size);  //(1)
        const modifiers = {};               //(2)
        for(const prop in buffer) {         //(3)
            if (typeof buffer[prop] !== 'function') {
                continue;
            }

            if (MODIFIER_NAMES.some(m => prop.startsWith(m))) { //(4)
                modifiers[prop] = buffer[prop].bind(buffer);
            } else {
                this[prop] = buffer[prop].bind(buffer); //(5)
            }
        }
        executor(modifiers);    //(6)
    }
}

//사용
const hello = 'Hello!';
const immutable = new ImmutableBuffer(hello.length, 
    ({write}) => {
        write(hello);
    }
)

console.log(String.fromCharCode(immutable.readInt8(0)));