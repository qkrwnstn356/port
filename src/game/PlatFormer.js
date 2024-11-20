import React, { useEffect, useRef, useState } from 'react';

const PlatFormer = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 충돌 감지 함수 추가
        const checkCollision = (rect1, rect2) => {
            return rect1.x < rect2.x + rect2.width &&
                   rect1.x + rect1.width > rect2.x &&
                   rect1.y < rect2.y + rect2.height &&
                   rect1.y + rect1.height > rect2.y;
        };

        // 키보드 이벤트 핸들러 추가
        const handleKeyDown = (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    gameState.keys.left = true;
                    break;
                case 'ArrowRight':
                    gameState.keys.right = true;
                    break;
                case 'ArrowUp':
                case ' ':
                    gameState.keys.up = true;
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    gameState.keys.left = false;
                    break;
                case 'ArrowRight':
                    gameState.keys.right = false;
                    break;
                case 'ArrowUp':
                case ' ':
                    gameState.keys.up = false;
                    break;
                default:
                    break;
            }
        };

        // 게임 상태
        const gameState = {
            player: {
                x: 50,
                y: 200,
                width: 30,
                height: 30,
                speed: 5,
                jumpForce: 12,
                gravity: 0.5,
                velocityY: 0,
                isJumping: false,
                direction: 'right',
                frame: 0,
                frameCount: 0
            },
            camera: {
                x: 0,
                y: 0
            },
            platforms: [
                { x: 0, y: 350, width: 2400, height: 20 },    // 긴 바닥
                { x: 300, y: 250, width: 200, height: 20 },
                { x: 600, y: 200, width: 200, height: 20 },
                { x: 900, y: 150, width: 200, height: 20 },
                { x: 1200, y: 250, width: 200, height: 20 },
                { x: 1500, y: 200, width: 200, height: 20 },
                { x: 1800, y: 150, width: 200, height: 20 }
            ],
            collectibles: [
                { x: 350, y: 200, width: 20, height: 20, collected: false },
                { x: 650, y: 150, width: 20, height: 20, collected: false },
                { x: 950, y: 100, width: 20, height: 20, collected: false },
                { x: 1250, y: 200, width: 20, height: 20, collected: false },
                { x: 1550, y: 150, width: 20, height: 20, collected: false }
            ],
            keys: {
                left: false,
                right: false,
                up: false
            },
            currentLevel: 1,
            levelComplete: false
        };

        // 레벨 설정
        const levels = {
            1: {
                platforms: gameState.platforms.slice(0, 4),
                collectibles: gameState.collectibles.slice(0, 2),
                endX: 800
            },
            2: {
                platforms: gameState.platforms.slice(0, 6),
                collectibles: gameState.collectibles.slice(0, 4),
                endX: 1600
            },
            3: {
                platforms: gameState.platforms,
                collectibles: gameState.collectibles,
                endX: 2400
            }
        };

        // 레벨 설정 함수
        const setCurrentLevel = (levelNum) => {
            gameState.platforms = levels[levelNum].platforms;
            gameState.collectibles = levels[levelNum].collectibles;
            gameState.player.x = 50;
            gameState.player.y = 200;
            gameState.currentLevel = levelNum;
            gameState.levelComplete = false;
            setLevel(levelNum);
        };

        // 플레이어 애니메이션 업데이트
        const updatePlayerAnimation = () => {
            gameState.player.frameCount++;
            if (gameState.player.frameCount >= 5) { // 매 5프레임마다 애니메이션 변경
                gameState.player.frame = (gameState.player.frame + 1) % 4;
                gameState.player.frameCount = 0;
            }
        };

        // 플레이어 업데이트
        const updatePlayer = () => {
            // 좌우 이동
            if (gameState.keys.left) {
                gameState.player.x -= gameState.player.speed;
                gameState.player.direction = 'left';
            }
            if (gameState.keys.right) {
                gameState.player.x += gameState.player.speed;
                gameState.player.direction = 'right';
            }
        
            // 중력 적용
            gameState.player.velocityY += gameState.player.gravity;
            gameState.player.y += gameState.player.velocityY;
        
            // 플랫폼 충돌 체크
            let onPlatform = false;
            gameState.platforms.forEach(platform => {
                if (checkCollision(gameState.player, platform)) {
                    if (gameState.player.velocityY > 0) {
                        gameState.player.y = platform.y - gameState.player.height;
                        gameState.player.velocityY = 0;
                        gameState.player.isJumping = false;
                        onPlatform = true;
                    } else if (gameState.player.velocityY < 0) {
                        gameState.player.y = platform.y + platform.height;
                        gameState.player.velocityY = 0;
                    }
                }
            });
        
            // 수집품 체크
            gameState.collectibles.forEach(collectible => {
                if (!collectible.collected && checkCollision(gameState.player, collectible)) {
                    collectible.collected = true;
                    setScore(prevScore => prevScore + 100);
                    
                    if (gameState.collectibles.every(c => c.collected)) {
                        gameState.levelComplete = true;
                        if (gameState.currentLevel < Object.keys(levels).length) {
                            setTimeout(() => {
                                setCurrentLevel(gameState.currentLevel + 1);
                            }, 1000);
                        }
                    }
                }
            });
        
            // 점프
            if (gameState.keys.up && !gameState.player.isJumping && onPlatform) {
                gameState.player.velocityY = -gameState.player.jumpForce;
                gameState.player.isJumping = true;
            }
        
            // 레벨 경계 체크 (전체 레벨 너비 기준)
            if (gameState.player.x < 0) {
                gameState.player.x = 0;
            }
            const currentLevelEndX = levels[gameState.currentLevel].endX;
            if (gameState.player.x + gameState.player.width > currentLevelEndX) {
                gameState.player.x = currentLevelEndX - gameState.player.width;
            }
        
            updatePlayerAnimation();
        };

        // 카메라 업데이트 함수 추가
        const updateCamera = () => {
            // 플레이어가 화면 중앙에 오도록 카메라 위치 조정
            const targetX = gameState.player.x - canvas.width / 2 + gameState.player.width / 2;
            
            // 부드러운 카메라 이동 (감속도 조정)
            gameState.camera.x += (targetX - gameState.camera.x) * 0.1;
            
            // 카메라가 레벨 경계를 벗어나지 않도록 제한
            const currentLevelEndX = levels[gameState.currentLevel].endX;
            gameState.camera.x = Math.max(0, Math.min(gameState.camera.x, 
                currentLevelEndX - canvas.width));
        };

        // 게임 렌더링
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 배경
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        
            // 카메라 위치를 고려한 오브젝트 렌더링
            ctx.save();
            ctx.translate(-Math.floor(gameState.camera.x), 0);
        
            // 플랫폼 그리기
            ctx.fillStyle = '#8B4513';
            gameState.platforms.forEach(platform => {
                // 화면에 보이는 플랫폼만 렌더링
                if (platform.x + platform.width > gameState.camera.x && 
                    platform.x < gameState.camera.x + canvas.width) {
                    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
                }
            });
        
            // 수집품 그리기
            gameState.collectibles.forEach(collectible => {
                if (!collectible.collected && 
                    collectible.x + collectible.width > gameState.camera.x && 
                    collectible.x < gameState.camera.x + canvas.width) {
                    ctx.fillStyle = '#FFD700';
                    ctx.beginPath();
                    ctx.arc(
                        collectible.x + collectible.width/2,
                        collectible.y + collectible.height/2,
                        collectible.width/2,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                }
            });
        
            // 플레이어 그리기
            ctx.fillStyle = '#FF0000';
            const bounceOffset = Math.sin(gameState.player.frame * Math.PI / 2) * 3;
            ctx.fillRect(
                gameState.player.x,
                gameState.player.y - bounceOffset,
                gameState.player.width,
                gameState.player.height
            );
        
            ctx.restore();
        
            // UI는 카메라와 독립적으로 그리기
            ctx.fillStyle = '#000';
            ctx.font = '20px Arial';
            ctx.fillText(`Level: ${level}`, 20, 30);
            ctx.fillText(`Score: ${score}`, 20, 60);
        
            // 레벨 완료 메시지
            if (gameState.levelComplete) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#fff';
                ctx.font = '40px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(
                    `Level ${level} Complete!`, 
                    canvas.width/2, 
                    canvas.height/2
                );
            }
        };

        // 게임 루프
        const gameLoop = () => {
            if (!gameState.levelComplete) {
                updatePlayer();
                updateCamera();  // 카메라 업데이트 추가
            }
            render();
            requestAnimationFrame(gameLoop);
        };

        // 이벤트 리스너 등록
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // 초기 레벨 설정
        setCurrentLevel(1);

        // 게임 시작
        gameLoop();

        // 클린업
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [level, score]); // level과 score를 의존성 배열에 추가

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>플랫포머 게임</h2>
            <p>방향키로 이동, 스페이스바로 점프!</p>
            <p>현재 레벨: {level} | 점수: {score}</p>
            <canvas
                ref={canvasRef}
                width={800}
                height={400}
                style={{
                    border: '2px solid #000',
                    borderRadius: '5px'
                }}
            />
        </div>
    );
};

export default PlatFormer;