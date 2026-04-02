import { Box3, ExtrudeGeometry, Vector3 } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const loader = new SVGLoader();
const logoCache = new Map();

function getGeometryBounds(geometries) {
  const bounds = new Box3();

  geometries.forEach((geometry) => {
    geometry.computeBoundingBox();
    bounds.expandByPoint(geometry.boundingBox.min);
    bounds.expandByPoint(geometry.boundingBox.max);
  });

  return bounds;
}

export function normalizeGeometryToWidth(geometry, targetWidth) {
  geometry.computeBoundingBox();

  const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  const centerX = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
  const centerY = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
  const centerZ = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;
  const scale = width === 0 ? 1 : targetWidth / width;

  geometry.translate(-centerX, -centerY, -centerZ);
  geometry.scale(scale, scale, scale);
  geometry.computeBoundingBox();
  geometry.computeVertexNormals();

  return geometry;
}

export function createExtrudedLogo({
  curveSegments = 12,
  depth = 0.16,
  svg,
  targetWidth = 2,
}) {
  const cacheKey = `${svg}::${depth}::${targetWidth}::${curveSegments}`;

  if (logoCache.has(cacheKey)) {
    return logoCache.get(cacheKey);
  }

  const parsedSvg = loader.parse(svg);
  const geometries = parsedSvg.paths.flatMap((path) =>
    SVGLoader.createShapes(path).map(
      (shape) =>
        new ExtrudeGeometry(shape, {
          bevelEnabled: false,
          curveSegments,
          depth,
          steps: 1,
        }),
    ),
  );

  geometries.forEach((geometry) => geometry.scale(1, -1, 1));

  const bounds = getGeometryBounds(geometries);
  const size = new Vector3();
  bounds.getSize(size);

  const center = new Vector3();
  bounds.getCenter(center);
  const scale = size.x === 0 ? 1 : targetWidth / size.x;

  geometries.forEach((geometry) => {
    geometry.translate(-center.x, -center.y, -center.z);
    geometry.scale(scale, scale, scale);
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();
  });

  const logo = {
    geometries,
    size: {
      depth: size.z * scale,
      height: size.y * scale,
      width: size.x * scale,
    },
  };

  logoCache.set(cacheKey, logo);

  return logo;
}
