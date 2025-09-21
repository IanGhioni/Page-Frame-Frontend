import rana from '../src/assets/fotos_perfil/rana.png';
import gato from '../src/assets/fotos_perfil/gato.png';
import panda from '../src/assets/fotos_perfil/panda.png';
import mariposa from '../src/assets/fotos_perfil/mariposa.png';
import vaquita from '../src/assets/fotos_perfil/vaquita.png';
import perro from '../src/assets/fotos_perfil/perro.png';
import ballena from '../src/assets/fotos_perfil/ballena.png';

const fotosPerfil ={
    rana,
    gato,
    panda,
    mariposa,
    vaquita,
    perro,
    ballena
};

export function getFotoPerfil(foto) {
    const defaultImg = panda;
    return fotosPerfil[foto] || defaultImg;
}