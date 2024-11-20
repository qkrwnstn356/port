import React, { useEffect, useRef, useState, useCallback } from 'react';

const Worms = () => {
    const canvasRef = useRef(null);
    const [worm, setWorm] = useState([{ x: 200, y: 200 }]);
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [food, setFood] = useState(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const canvasWidth = 800;
    const canvasHeight = 800;
    const segmentSize = 20;
    const foodSize = 40;
    const gameSpeedRef = useRef(100); // 초기 속도를 더 빠르게 설정
    const gameLoopRef = useRef(null);
    const lastKeyPressRef = useRef(null);

    const resetGame = useCallback(() => {
        setWorm([{ x: 200, y: 200 }]);
        setDirection({ x: 1, y: 0 });
        setScore(0);
        setGameOver(false);
        setIsPlaying(false);
        lastKeyPressRef.current = null;
        setFood(null);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }, []);

    const generateFood = useCallback(() => {
        const availablePositions = [];
        for (let x = 0; x < canvasWidth; x += foodSize) {
            for (let y = 0; y < canvasHeight; y += foodSize) {
                if (!worm.some(segment => segment.x === x && segment.y === y)) {
                    availablePositions.push({ x, y });
                }
            }
        }
        
        if (availablePositions.length > 0) {
            const randomIndex = Math.floor(Math.random() * availablePositions.length);
            setFood(availablePositions[randomIndex]);
        }
    }, [worm]);

    const drawWorm = useCallback((ctx) => {
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // 테두리 그리기
        ctx.strokeStyle = '#333';
        ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
        
        if (food) {
            ctx.fillStyle = '#FF4444';
            ctx.beginPath();
            ctx.arc(
                food.x + foodSize / 2, 
                food.y + foodSize / 2, 
                foodSize / 2, 
                0, 
                Math.PI * 2
            );
            ctx.fill();
        }

        worm.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? '#32CD32' : '#228B22';
            ctx.beginPath();
            ctx.roundRect(segment.x, segment.y, segmentSize - 1, segmentSize - 1, 8);
            ctx.fill();
        });

        ctx.fillStyle = '#000';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${score}`, 20, 40);

        if (gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 36px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over!', canvasWidth / 2, canvasHeight / 2 - 40);
            ctx.font = 'bold 24px Arial';
            ctx.fillText(`Final Score: ${score}`, canvasWidth / 2, canvasHeight / 2 + 10);
            ctx.fillText('Press Space to Restart', canvasWidth / 2, canvasHeight / 2 + 60);
        }
    }, [worm, food, score, gameOver]);

    const checkCollision = useCallback((head) => {
        if (head.x < 0 || head.x >= canvasWidth || 
            head.y < 0 || head.y >= canvasHeight) {
            return true;
        }
        
        return worm.slice(1).some(segment => 
            segment.x === head.x && segment.y === head.y
        );
    }, [worm]);

    const update = useCallback(() => {
        if (gameOver) return; 
        if (!isPlaying) return; 
    
        const head = { 
            x: worm[0].x + direction.x * segmentSize, 
            y: worm[0].y + direction.y * segmentSize 
        };
    
        // 벽에 부딪히면 방향을 바꾸지 않도록 수정
        if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight) {
            // 벽에 부딪혔을 때는 방향을 바꾸지 않고 업데이트를 종료
            return;
        }
    
        if (checkCollision(head)) {
            setGameOver(true);
            return;
        }
    
        let newWorm;
        if (food && 
            Math.abs(head.x - food.x) < foodSize && 
            Math.abs(head.y - food.y) < foodSize) {
            newWorm = [head, ...worm]; // 먹이를 먹으면 지렁이 길이 증가
            setScore(prev => prev + 10);
            generateFood();
            gameSpeedRef.current = Math.max(100, gameSpeedRef.current - 10); // 속도를 조금 더 빠르게 조정
        } else {
            newWorm = [head, ...worm.slice(0, -1)]; // 먹이를 먹지 않으면 꼬리 제거
        }
    
        setWorm(newWorm);
    }, [worm, direction, food, generateFood, gameOver, isPlaying, score, checkCollision]);

    const changeDirection = useCallback((event) => {
        if (gameOver) {
            if (event.code === 'Space') {
                resetGame();
                setTimeout(() => {
                    setIsPlaying(true);
                }, 100);
            }
            return;
        }
    
        if (!isPlaying) {
            if (event.code === 'Space') {
                setIsPlaying(true);
                return;
            }
        }
    
        const directions = {
            ArrowUp: { x: 0, y: -1 },
            ArrowDown: { x: 0, y: 1 },
            ArrowLeft: { x: -1, y: 0 },
            ArrowRight: { x: 1, y: 0 }
        };
    
        const newDirection = directions[event.key];
        if (newDirection) {
            event.preventDefault();
            const isOpposite = 
                (direction.x === -newDirection.x && direction.y === -newDirection.y);
            
            if (!isOpposite) {
                setDirection(newDirection);
                lastKeyPressRef.current = event.key;
            }
        }
    }, [direction, gameOver, isPlaying, resetGame]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let lastTime = 0;

        if (!food && isPlaying) {
            generateFood();
        }

        const gameLoop = (timestamp) => {
            if (timestamp - lastTime >= gameSpeedRef.current) {
                update();
                lastTime = timestamp;
            }
            drawWorm(ctx);
            gameLoopRef.current = requestAnimationFrame(gameLoop);
        };

        document.addEventListener('keydown', changeDirection);
        gameLoopRef.current = requestAnimationFrame(gameLoop);

        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
            document.removeEventListener('keydown', changeDirection);
        };
    }, [update, drawWorm, changeDirection, generateFood, food, isPlaying]);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <canvas 
                ref={canvasRef} 
                width={canvasWidth} 
                height={canvasHeight}
                style={{ 
                    border: '2px solid #333',
                    borderRadius: '5px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}
            />
            {!isPlaying && !gameOver && (
                <div style={{ marginTop: '20px' }}>
                    Press Space to Startz
                </div>
            )}
        </div>
    );
};

export default Worms;