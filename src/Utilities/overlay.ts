export default function overlay(src: any, opacity = "0.5") {
  return {
    backgroundImage: `url('${src}'),linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`,
  };
}
