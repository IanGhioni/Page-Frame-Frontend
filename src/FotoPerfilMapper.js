import rana from '../src/assets/fotos_perfil/rana.svg';
import gato from '../src/assets/fotos_perfil/gato.svg';
import panda from '../src/assets/fotos_perfil/panda.svg';
import mariposa from '../src/assets/fotos_perfil/mariposa.svg';
import vaquita from '../src/assets/fotos_perfil/vaquita.svg';
import perro from '../src/assets/fotos_perfil/perro.svg';
import ballena from '../src/assets/fotos_perfil/ballena.svg';

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