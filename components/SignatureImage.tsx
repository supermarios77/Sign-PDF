import { Image, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';
import React from 'react';


interface SignatureData {
    type: 'draw' | 'type' | 'file';
    content: string;
    font?: string;
}

interface Signature extends SignatureData {
    fontClass: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
}

interface SignatureImageProps {
    signature: Signature;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (newAttrs: Partial<Signature>) => void;
}

const SignatureImage: React.FC<SignatureImageProps> = ({ signature, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef<Konva.Image | Konva.Text>(null);
    const trRef = React.useRef<Konva.Transformer>(null);
    const [image] = useImage(signature.type === 'file' || signature.type === 'draw' ? signature.content : '');

    React.useEffect(() => {
        if (isSelected && trRef.current && shapeRef.current) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    const handleTransformEnd = () => {
        if (shapeRef.current) {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);
            onChange({
                x: node.x(),
                y: node.y(),
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(node.height() * scaleY),
                rotation: node.rotation(),
            });
        }
    };

    if (signature.type === 'type') {
        return (
            <>
                <Text
                    text={signature.content}
                    x={signature.x}
                    y={signature.y}
                    width={signature.width}
                    height={signature.height}
                    rotation={signature.rotation}
                    fontSize={24}
                    fontFamily={signature.fontClass || 'Helvetica'}
                    fill="black"
                    ref={shapeRef as React.RefObject<Konva.Text>}
                    draggable
                    onClick={onSelect}
                    onTap={onSelect}
                    onDragEnd={(e) => {
                        onChange({
                            x: e.target.x(),
                            y: e.target.y(),
                        });
                    }}
                    onTransformEnd={handleTransformEnd}
                />
                {isSelected && (
                    <Transformer
                        ref={trRef}
                        boundBoxFunc={(oldBox, newBox) => {
                            if (newBox.width < 5 || newBox.height < 5) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                    />
                )}
            </>
        );
    }

    return (
        <>
            <Image
                image={image}
                x={signature.x}
                y={signature.y}
                width={signature.width}
                height={signature.height}
                rotation={signature.rotation}
                ref={shapeRef as React.RefObject<Konva.Image>}
                draggable
                onClick={onSelect}
                onTap={onSelect}
                onDragEnd={(e) => {
                    onChange({
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={handleTransformEnd}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
};

export default SignatureImage